/**
 * Created by chuck7 on 16/7/19.
 */
"use strict";
const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot,'../'),
  staticDir = path.join(root, 'static'),
  dev = require('./dev.js'),
  _ = require('lodash');
let config = {};
//本地调试环境
if(process.env.NODE_ENV === 'development'){
  config = _.merge(config,dev);
}
module.exports = {
  app: {
    name:'kov-blog',
    port: 3000,
    adminPath: '/admin/' // 后台路径
  },
  debug:false,
  env:'production',
  redisConfig: {
    host: 'localhost',
    port: 6379
  },
  mongoConfig: { // 数据库配置
    url: 'mongodb://localhost:27017/kov-blog',
    opts:{
      user:'',
      pass:''
    }
  },
  'jwt': {
    'cert': 'koa-vue-mongo'
  },
  dir: { // 目录配置
    root,
    log: path.join(__dirname,'..', 'logs'),
    server:serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot,'resource', 'upload')
  },
};
