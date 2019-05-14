'use strict';

const Router = require('koa-router');
const router = new Router();

async function sendBacktoClient(ctx, data) {
  await ctx.res.writeHead(200, {
  });
  await ctx.res.write(data);
  await ctx.res.end();
}

router.post('/test', async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  console.log(data)
  await sendBacktoClient(ctx, JSON.stringify(data));
});

module.exports = router