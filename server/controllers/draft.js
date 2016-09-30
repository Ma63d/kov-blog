/**
 * Created by chuck7 on 16/9/14.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Draft = require('../models/draft.js');
module.exports.init = router => {
  router.post('/drafts', mw.verify_token, create);
  router.patch('/drafts/:id', mw.verify_token, modify)
  router.get('/drafts', mw.verify_token, draftList);
  router.get('/drafts/:id', mw.verify_token, draftDetail)
  router.delete('/drafts/:id', mw.verify_token,deleteDraft)
}
function* create(){
  /**
   * post body
   * {
    "title":"标题",
    "tags":[],
    "excerpt":"摘要 或 首段",
    "content":"文章内容"
    }
   */
  const title = this.request.body.title,
    createTime = new Date(),
    lastEditTime = new Date(),
    excerpt = '',
    content = '',
    article = null,
    draftPublished = false;
  if(title === ''){
    this.throw(400,'标题不能为空')
  }
  let draft = new Draft({
    title,
    createTime,
    lastEditTime,
    excerpt,
    content,
    article,
    draftPublished
  });
  draft = yield draft.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  /*draft.createTime = new Date(draft.createTime).format('yyyy-MM-dd hh:mm');
  draft.lastEditTime = new Date(draft.lastEditTime).format('yyyy-MM-dd hh:mm');*/
  utils.print(draft);
  this.status = 200;
  this.body = {
    success:true,
    data:draft
  }
}
function* draftList(){
  const tag = this.query.tag,
    queryOpt = {};
  if(tag !== undefined){
    queryOpt.tags= {"$all":[tag]}
  }
  utils.print(queryOpt);
  const draftArr = yield Draft.find(queryOpt)
    .select('title tags createTime lastEditTime excerpt article draftPublished')
    .populate('tags')
    .sort({ lastEditTime: -1})
    .exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })
  const resultArr = [];
  if(draftArr.length){
    draftArr.forEach((draft,index,arr)=>{
      draft = draft.toObject();
      /*draft.createTime = new Date(draft.createTime).format('yyyy-MM-dd hh:mm');
      draft.lastEditTime = new Date(draft.lastEditTime).format('yyyy-MM-dd hh:mm');*/
      resultArr.push(draft);
      utils.print(draft);
    })
  }
  this.status = 200;
  this.body = {
    success:true,
    data:resultArr
  };
}
function* draftDetail(){
  const id = this.params.id;
  const draft = (yield Draft.findOne({_id:id})
    .populate('tags')
    .select('title tags createTime lastEditTime excerpt article draftPublished content')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })).toObject();
  this.status = 200;
  /*if(draft){
    draft.createTime = new Date(draft.createTime).format('yyyy-MM-dd hh:mm');
    draft.lastEditTime = new Date(draft.lastEditTime).format('yyyy-MM-dd hh:mm');
  }*/

  this.body = {
    success:true,
    data:draft
  }
}
function* modify(){
  const id = this.params.id;
  const modifyOption = this.request.body;
  if(modifyOption.content){
    const contentArr = modifyOption.content.split('<!-- more -->');
    if(contentArr.length > 1){
      modifyOption.excerpt = contentArr[0];
    }else{
      modifyOption.excerpt = '';
    }
  }
  modifyOption.lastEditTime = new Date();
  modifyOption.draftPublished = false;
  let result = yield Draft.findByIdAndUpdate(id,{$set:modifyOption},{new:true}).populate('tags').exec()
    .catch(err => {
      if(err.name === 'CastError'){
        this.throw(400,'id不存在');
      }else{
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }
    });
  result = result.toObject();
  /*result.createTime = new Date(result.createTime).format('yyyy-MM-dd hh:mm');
  result.lastEditTime = new Date(result.lastEditTime).format('yyyy-MM-dd hh:mm');*/
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data:result
  }
}
function* deleteDraft(){
  const id = this.params.id;
  const draft = yield Draft.findOne({_id:id})
    .select('article')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
  //如果该草稿已经发布为文章,则改草稿不能删除,
  //因为草稿是查看其对应的文章的入口
  //功能上只提供把已发布的文章隐藏
  //和未发布为文章的草稿删除
  if(null === draft){
    this.throw(400,'id不存在');
  }
  if(null !== draft.article){
    this.throw(403,'已发布文章的草稿不能删除');
  }
  const result = yield Draft.remove({_id:id}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  this.status = 200;
  this.body = {
    success:true,
  }
}
