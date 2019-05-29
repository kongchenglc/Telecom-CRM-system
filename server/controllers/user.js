'use strict';

const Base = require('../base');

module.exports = class extends Base {
  constructor() {
    super();
  }

  async query(ctx) {
    let requestData = ctx.request.body;
    return this.db.get('user').find({
      $or: [
        { name: new RegExp(`.*${requestData.searchText}.*`) },
        { phoneNum: new RegExp(`.*${requestData.searchText}.*`) },
        { address: new RegExp(`.*${requestData.searchText}.*`) },
      ]
    }).then(data => {
      if (data.length) {
        return JSON.stringify(data);
      } else {
        return "unregistered";
      }
    })
  }

  async add(ctx) {
    let requestData = ctx.request.body;
    return this.db.get('user').insert(
      requestData.value
    ).then(data => {

      // 写入记录
      this.db.get('main').update({ name: 'user' }, { $addToSet: { value: { type: "add", description: requestData.value.phoneNum } } })

      // 返回数据
      if (data.length) {
        return JSON.stringify(data);
      } else {
        return "unregistered";
      }
    })
  }

  async delete(ctx) {
    let requestData = ctx.request.body;
    requestData.value.map(item => {
      this.db.get('user').remove({
        _id: item._id
      }).then(data => {
       
        // 写入记录
        this.db.get('main').update({ name: 'user' }, { $addToSet: { value: { type: "delete", description: item.phoneNum } } })

        if (data.length) {
          return JSON.stringify(data);
        } else {
          return "unregistered";
        }
      })
    })
    return "unregistered"
  }

  async update(ctx) {
    let requestData = ctx.request.body;
    return this.db.get('user')
      .update({ _id: requestData.value._id }, { $set: requestData.value })
      .then(data => {

        // 写入记录
        this.db.get('main').update({ name: 'user' }, { $addToSet: { value: { type: "update", description: requestData.value.phoneNum } } })

        if (data.length) {
          return JSON.stringify(data);
        } else {
          return "unregistered";
        }
      })
  }


}
