/**
 * Created by chuck7 on 16/8/16.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Tag = require('../models/tag.js');
module.exports.init = router => {
  router.post('/tags', mw.verify_token, create);
  router.get('/tags', tokenList);
}
function* tokenList(next){
  const tagList = yield Tag.find().exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  this.status = 200;
  this.body = {
    success:true,
    data:tagList
  };
}
function* create(next){
  const tagName = this.request.body.name;
  if(undefined === tagName || 0 === tagName.length){
    this.throw(400,'标签名缺失');
  }
  const tag = yield Tag.findOne({name:tagName}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(tag);
  if(tag !== null){
    this.throw(403,'tag已存在')
  }
  const newTag = new Tag({
    name:tagName
  });
  const result = yield newTag.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data:{
      id:result.id
    }
  }
}
