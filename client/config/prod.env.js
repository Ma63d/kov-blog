var fs = require('fs');
var merge = require('webpack-merge')
config = {
  NODE_ENV: '"production"',
  //填写生产环境时,该博客的访问地址
  index:'"http://localhost"',
  api:'"http://localhost:3000/api/"'
}
if(process.env.NODE_ENV === 'production'){
  if(fs.existsSync(__dirname+'/private.js')){
    config = merge(config,require('./private.js'));
  }
}
module.exports = config
