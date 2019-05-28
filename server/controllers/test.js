'use strict';

const Base = require('../base');

module.exports = class extends Base {
  constructor() {
    super();
  }

  async query(ctx) {
    return this.db.get('user').find().then(data => {
      if(data.length) {
          return JSON.stringify(data[0]);
      } else {
          return "unregistered";
      }
    })
  }
}
