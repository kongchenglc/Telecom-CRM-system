const Router = require('koa-router');
const router = new Router();

const user = require('./user');
const dashboard = require('./dashboard')

// const login = require('./login');
// const table = require('./table');
// const data = require('./data');

// const auth = require('../middleware/authorization');

router.use('/user', user.routes());
router.use('/dashboard', dashboard.routes());
// router.use('/login', login.routes());
// router.use('/table', auth, table.routes());
// router.use('/data', auth, data.routes());

module.exports = router