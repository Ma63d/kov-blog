/**
 * Created by chuck7 on 16/9/21.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Me = require('../models/me.js');
module.exports.init = function* (router) {
  yield seed;
  router.get('/me',getInfoAboutMe);
  router.patch('/me', mw.verify_token, modify);
}
//生成"关于我"页面的原始数据
function* seed(){
  let me = yield Me.find().exec().catch(err => {
    utils.logger.error(err);
    throw(new Error('数据seed失败,请debug后重新启动'));
  });
  //utils.print(me);
  if(0 === me.length){
    //没啥用的初始化数据,那么就膜一下吧
    me = new Me({content:'too young ,sometimes naive'})
    yield me.save().catch(err => {
      utils.logger.error(err);
      throw(new Error('数据seed失败,请debug后重新启动'));
    });
  }
}
function* getInfoAboutMe(){
  let me = yield Me.find().exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误');
  })
  if(me.length){
    me = me[0].toObject();
    delete me._id;
    this.status = 200;
    this.body = {
      success:true,
      data:me
    };
  }else{
    this.throw(500,'内部错误');
  }
}
function* modify(){
  const content = this.request.body.content;
  let me = yield Me.findOneAndUpdate({},{content}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误');
  });
  this.status = 200;
  this.body = {
    success:true
  };
}
