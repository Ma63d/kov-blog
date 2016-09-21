var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var config = require('./index')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //填写开发环境时,该博客的访问地址:
  index:'"http://localhost:'+config.dev.port
})
