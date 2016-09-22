/**
 * Created by chuck7 on 16/7/15.
 */
"use strict";
const config = require('./configs/index');

const path = require('path'),
  co = require('co'),
  assert = require('assert'),
  app = require('koa')(),
  bodyParser = require('koa-bodyparser'),
  cors = require('koa-cors'),
  staticFiles = require('koa-static'),
  router = require('koa-router')({
    prefix:config.app.adminPath
  }),
  onerror = require('koa-onerror'),
  mongoose = require('mongoose'),
  jwt = require("jsonwebtoken"),
  controllers = require('./controllers/index.js'),
  utils =require('./utils/index.js');
//如果你的node版本高于4.0 ,可以使用node自带promise
mongoose.Promise = global.Promise;
jwt.co_verify = function(jwtString, secretOrPublicKey, options){
  return function(cb){
    jwt.verify(jwtString, secretOrPublicKey, options,cb);
  }
}


co(function*() {
  mongoose.connect(config.mongoConfig.url,config.mongoConfig.opts);
  /**
   * 将config注入中间件的ctx
   * */
  app.context.config = config

  app.use(cors({
    maxAge: 7 * 24 * 60 * 60,
    // 7 days 预请求头有效期
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
  }))

  /**
   * error信息优化
   * */
  onerror(app);
  app.on('error',function(err,ctx){
    if((ctx.status === 404 && err.status === undefined) || err.status === 500){
      utils.logger.error('server error', err);
      utils.logger.error(ctx);
    }
    utils.print(err);
  })

  /*app.use(staticFiles(config.dir.resource, {
    maxage: 60 * 60 * 24 * 365,
    //静态文件有效期
    gzip: true
  }))*/
  app.use(bodyParser());
  yield controllers.init(router);
  app.use(router.routes());
  app.listen(config.app.port, ()=>{
    utils.print('app is listening on port '+config.app.port);
  })
}).catch(function(err) {
  utils.print(err.stack);
});
