var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var config = require('./index')
var port = 8080;
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port:port,
  api:'"http://localhost:3000/api/"',
  // 如果你有你自己的leetcode解题源码博客,那可以加上开启这个选项,否则请填写'null'
  // 我推荐使用我自己编写的leetcode-viewer,项目地址 https://github.com/Ma63d/leetcode-viewer
  // 只需要几行命令就可以立马搭建出一个完整的leetcode解题源码单页应用,完全无需后台,基于vue2.0
  // 布到github pages或者你自己的服务器上就可以完整呈现你的leetcode解题源码.
  leetcode:'"http://chuckliu.me/leetcode/#/cover"',
  //请修改为你自己的多说二级域名,
  duoshuoShortName:'"xiachufang"'
})
