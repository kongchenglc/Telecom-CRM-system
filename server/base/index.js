'use strict';

const monk = require('monk')
const {database} = require('../config.json')
const db = monk(`${database.host}:${database.port}/${database.user}`);

module.exports = class {
    constructor() {
        this.db = db;
    }
}