'use strict';

const Base = require('../base');

module.exports = class extends Base {
  constructor() {
    super();
  }

  async queryUser(ctx) {
    return this.db.get('main').find({name: 'user'}).then(data => {
      if (data.length) {
        return JSON.stringify(data[0]);
      } else {
        return "unregistered";
      }
    })
  }

  async addUser(ctx) {
    let requestData = ctx.request.body;
    return this.db.get('main').insert(
      requestData.value
    ).then(data => {
      if (data.length) {
        return JSON.stringify(data);
      } else {
        return "unregistered";
      }
    })
  }

}
