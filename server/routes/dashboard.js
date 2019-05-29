'use strict';

const Router = require('koa-router');
const router = new Router();
const Dashboard = require('../controllers/dashboard')

const dashboard = new Dashboard()

async function sendBacktoClient(ctx, data) {
  await ctx.res.writeHead(200, {
  });
  await ctx.res.write(data);
  await ctx.res.end();
}

router.post('/userData', async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  console.log(data)
  // 数据操作
  switch (data.operate) {
    case 'query': data = await dashboard.queryUser(ctx);break;
    case 'add': data = await dashboard.addUser(ctx);break;
  }
  await sendBacktoClient(ctx, JSON.stringify(data));
});

router.post('/activeData', async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  console.log(data)
  // 数据操作
  switch (data.operate) {
    case 'query': data = await dashboard.queryActive(ctx);break;
    case 'add': data = await dashboard.addActive(ctx);break;
  }
  await sendBacktoClient(ctx, JSON.stringify(data));
});

router.post('/commentData', async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  console.log(data)
  // 数据操作
  switch (data.operate) {
    case 'query': data = await dashboard.queryComment(ctx);break;
    case 'add': data = await dashboard.addComment(ctx);break;
  }
  await sendBacktoClient(ctx, JSON.stringify(data));
});

module.exports = router