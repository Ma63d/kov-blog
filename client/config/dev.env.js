var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var config = require('./index')
var port = 8080;
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port:port,
  //填写开发环境时,该博客的访问地址:
  index:'"http://localhost:'+port+'"',
  api:'"http://localhost:3000/"'
})
