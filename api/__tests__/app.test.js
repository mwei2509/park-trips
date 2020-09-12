const supertest = require('supertest');
const Router = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new Router();

const cookieName = 'test';
const cookieValue = 'some-value';
const cookieTestUrl = '/auth/skipjwt';
const sequelizeValidationErrorUrl = '/auth/sequelize/validation/error';

const lib = require('../src/app');
const PORT = process.env.PORT || 3000;

let server, request;

describe('App', () => {
  before(() => {
    lib.listen(
      {
        port: PORT
      },
      function (err, _server, app) {
        if (err) {
          throw err;
        }
        server = _server;
        console.log('API server listening on port:', server.address().port);

        router.get(cookieTestUrl, async ctx => {
          ctx.body = 'ok';
          ctx.cookies.set(cookieName, cookieValue, { maxAge: 10 });
        });
        router.get(sequelizeValidationErrorUrl, async ctx => {
          throw new ValidationError('Sequelize validation error!');
        });

        app.use(router.routes());

        request = supertest(server);
      }
    );
  });

  after(() => {
    server.close();
  });

  it('always sets a default cookie domain to enable cookie sharing across subdomains', done => {
    const hostname = 'api.parktrips.com';
    const expectedDomain = 'parktrips.com';
    const expectedCookie = new RegExp(
      `${cookieName}=${cookieValue}; path=/; expires=.*; domain=${expectedDomain}`
    );

    request
      .get(cookieTestUrl)
      .set('X-Forwarded-Host', hostname)
      .expect(200)
      .expect('set-cookie', expectedCookie, done);
  });

  it('returns a 400 error when a SequelizeValidationError is thrown', done => {
    request.get(sequelizeValidationErrorUrl).expect(400, done);
  });
});
