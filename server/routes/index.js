const Router = require('koa-router');
const router = new Router();

const test = require('./test');
// const login = require('./login');
// const table = require('./table');
// const data = require('./data');

// const auth = require('../middleware/authorization');

router.use('/test', test.routes());
// router.use('/login', login.routes());
// router.use('/table', auth, table.routes());
// router.use('/data', auth, data.routes());

module.exports = router