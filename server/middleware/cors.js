'use strict';

/**
 * CORS 实现跨域访问
 */
module.exports = async function(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, phone, secret');

    if (ctx.method == 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
}