/**
 * Created by chuck7 on 16/8/16.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Tag = require('../models/tag.js');
const Article = require('../models/article.js');
const Draft = require('../models/draft.js');
module.exports.init = router => {
  router.post('/tags', mw.verify_token, create);
  router.get('/tags', tokenList);
  router.patch('/tags/:id', mw.verify_token, modify);
  router.delete('/tags/:id', mw.verify_token, deleteTag);
}
function* tokenList(next){
  const queryStartWith = this.query['start-with'];
  const queryOption = {};
  if(undefined !== queryStartWith){
    queryOption.name = {$regex:'^'+queryStartWith}
  }
  const tagList = yield Tag.find(queryOption).exec().catch(err => {
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
    this.status = 200;
    //标签已存在
    this.body = {
      success:false,
      data:{
        id:tag.id
      }
    }
    return;
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
function* modify(){
  const tagName = this.request.body.name;
  const tagId = this.params.id;
  const tag = yield Tag.findOne({name:tagName}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(tag);
  if(tag !== null){
    this.status = 200;
    this.body = {
      success:false,
      data:{
        id:tag.id
      }
    }
  }else{
    yield Tag.update({_id:tagId},{$set:{name:tagName}}).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
    this.status = 200;
    this.body = {
      success:true
    }
  }
}
function* deleteTag(){
  const id = this.params.id;
  yield [Draft.update({},{$pull:{tags:id}}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  }),Article.update({},{$pull:{tags:id}}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  }),Tag.remove({_id:id}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })];
  this.status = 200;
  this.body = {
    success:true
  }
}
