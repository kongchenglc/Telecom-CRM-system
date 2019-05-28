'use strict';

const Router = require('koa-router');
const router = new Router();
const Test = require('../controllers/test')

const test = new Test()

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
  // 数据操作
  switch (data.operate) {
    case 'query': data = await test.query(ctx);break;
  }


  await sendBacktoClient(ctx, JSON.stringify(data));
});

module.exports = router