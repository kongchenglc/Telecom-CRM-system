'use strict';

const monk = require('monk')
const {database} = require('../config.json')
const db = monk(`${database.host}:${database.port}/${database.user}`);


db.get('user').find({ "asdf" : "asdfadf" },{ _id: 0 }).then(data => {
  if(data.length) {
      console.log(JSON.stringify(data[0]));
  } else {
      return "unregistered";
  }
})

module.exports = class {
    constructor() {
        this.getDate = getDate;
        this.sql = mysql.sql;
    }
}