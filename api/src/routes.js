const Router = require('koa-router');
const router = new Router();

router.get('/test', async (ctx) => {
  ctx.body = 'success';
});

module.exports = router.routes();
