'use strict';

const Router = require('koa-router');
const router = new Router();
const User = require('../controllers/user')

const user = new User()

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
    case 'query': data = await user.query(ctx);break;
    case 'add': data = await user.add(ctx);break;
    case 'delete': data = await user.delete(ctx);break;
    case 'update': data = await user.update(ctx);break;
  }


  await sendBacktoClient(ctx, JSON.stringify(data));
});

module.exports = router