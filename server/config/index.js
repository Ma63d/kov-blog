/**
 * Created by chuck7 on 16/7/19.
 */
var path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot,'../'),
  resourceDir = path.join(serverRoot, 'resource'),
  staticDir = path.join(root, 'static');
export default {
  app: {
    port: 8080
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  db: { // 数据库配置
    url: 'mongodb://localhost:27017/kov-blog',
  },
  'jwt': {
    'cert': 'koa-vue-mongo'
  },
  port: 3000, // 程序端口
  dir: { // 目录配置
    root,
    server:serverRoot,
    controller: path.join(serverRoot, 'controllers'),
    static: staticDir,
    resource: resourceDir,
    lib: path.join(serverRoot, 'lib'),
    upload: path.join(resourceDir, 'upload')
  },
  adminPath: '/admin/' // 后台路径
};
