'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const route = require('./routes');

const config = require('./config');


const app = new Koa();

app .use(bodyParser())
    .use(cors)
    // .use(logger)
    .use(route.routes());

// 默认端口80
const port = config.port || 80;
app.listen(port, () => {
    console.log(`>>> Server is starting at http://127.0.0.1:${port}`)
});