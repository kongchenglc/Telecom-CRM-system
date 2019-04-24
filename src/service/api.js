import request from '../utils/request'
require('./mock')

export default {
  login: (data, config) => request.post('login', {data, ...config})
}