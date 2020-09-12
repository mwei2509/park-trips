const server = {};

require('dotenv').config();

const http = require('http');
const Koa = require('koa');
const { createTerminus } = require('@godaddy/terminus');
const { ValidationError } = require('sequelize');
const bodyParser = require('koa-bodyparser');
const sequelize = require('./models').sequelize;
const jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const { pathOr } = require('ramda');

const routes = require('./routes');
const { verifyJWT } = require('./helpers/auth');

const secret = process.env.JWT_SECRET;
const cookie = process.env.JWT_COOKIE;
const sharedServicesNamespace = /^\/internal/;

const app = new Koa();

app.proxy = true; // we use an nginx proxy on staging and production

app.use(logger());

// Set up CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.TRADING_WEB_BASE_URL,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'X-Requested-With']
  })
);

// Set up Helmet for XSS headers
app.use(helmet());

// Set up JWT authorization for shared services
app.use(async (ctx, next) => {
  const isAuthPath = sharedServicesNamespace.test(ctx.path);

  if (isAuthPath) {
    let isAuthorized = false;
    const authHeader = pathOr(false, ['request', 'header', 'authorization'], ctx);

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      isAuthorized = verifyJWT(token);
    }

    if (!isAuthorized) {
      ctx.throw(403, 'Not authorized');
    }
  }

  await next();
});

// Set up JWT authorization for client
app.use(
  jwt({ secret, cookie }).unless({
    path: [
      sharedServicesNamespace,
      /^\/auth/,
      /^\/login/,
      /^\/test/
    ]
  })
);

// Default the domain property on all cookies so that cookies can be shared
// between frontend (web) and backend (api) subdomains.
app.use(async (ctx, next) => {
  const oldCookieSetter = ctx.cookies.set;
  const domain = ctx.hostname
    .split('.')
    .filter(part => !ctx.subdomains.includes(part))
    .join('.');

  ctx.cookies.set = (name, value, options) => {
    oldCookieSetter.call(ctx.cookies, name, value, { domain, ...options });
  };

  await next();
});

// Response time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser());

// Custom 401 handling (first middleware)
app.use(function (ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  });
});

// Custom handling to return 400 error on Sequelize.ValidationError
app.use(function (ctx, next) {
  return next().catch(err => {
    if (err instanceof ValidationError) {
      console.warn(err);
      ctx.throw(400);
    } else {
      throw err;
    }
  });
});

app.use(routes);

server.listen = function serverListen (opts, cb) {
  const _server = http.createServer(app.callback()).listen(opts.port);
  const options = {
    healthChecks: {
      '/healthcheck': healthCheck
    }
  };
  createTerminus(_server, options);
  _server.on('listening', () => {
    cb(null, _server, app);
  });
};

// set up terminus for health checks
async function healthCheck () {
  return sequelize
    .authenticate()
    .then(() => Promise.resolve())
    .catch(err => Promise.reject(err));
}

module.exports = server;
