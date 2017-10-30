'use strict'
const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isPro ? 'http://www.wphkj.cn/api/' : 'api/'
}
