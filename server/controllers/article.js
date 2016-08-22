/**
 * Created by chuck7 on 16/8/17.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Article = require('../models/article.js');
module.exports.init = router => {
  router.post('/articles', mw.verify_token, create);
  router.get('/articles', articleList);
  router.get('/articles/:id', articleDetail);
  router.patch('/articles/:id', mw.verify_token, modify);
  router.get('/hidden-articles', hiddenArticleList);
  router.get('/hidden-articles/:id', hiddenArticleDetail);
}
function* create(){
  /**
   * post body
   * {
    "title":"标题",
    "author":"作者",
    "tags":[],
    "hidden": false,//是否对外可见
    "excerpt":"摘要 或 首段",
    "content":"文章内容"
    }
  */
  const title = this.request.body.title,
    author = this.request.body.author,
    visits = 0,
    tags = this.request.body.tags,
    createTime = new Date(),
    lastEditTime = null,
    hidden = this.request.body.hidden,
    excerpt = this.request.body.excerpt,
    content = this.request.body.content,
    comments = [];
  if(title === ''){
    this.throw(400,'标题不能为空')
  }else if(author === ''){
    this.throw(400,'作者不能为空')
  }else if(!(hidden === true || hidden === false)){
    this.throw(400,`'hidden'字段错误`)
  }else if(content=== undefined || content.length ===0){
    this.throw(400,`文章内容不能为空`)
  }
  const article = new Article({
    title,
    author,
    visits,
    tags,
    createTime,
    lastEditTime,
    hidden,
    excerpt,
    content,
    comments
  });
  const result = yield article.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data:{
      id:result._id
    }
  }
}
function* articleList(next){
  const limit = ~~this.query.limit,
    page = ~~this.query.page;
  utils.print(limit);
  utils.print(page);
  let skip;
  if(page === 0){
    skip = 0
  }else{
    skip = limit * (page - 1)
  }
  const articleArr = yield Article.find({hidden:false})
    .populate('tags')
    .select('title author visits tags createTime lastEditTime excerpt')
    .limit(limit).skip(skip).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  this.status = 200;
  utils.print(articleArr);
  this.body = {
    success:true,
    data:articleArr
  }
}
function* articleDetail(next){
  const id = this.params.id;
  const article = yield Article.findOne({_id:id,hidden:false})
    .populate('tags')
    .select('title author visits tags createTime lastEditTime excerpt content')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
  this.status = 200;
  utils.print(article);
  this.body = {
    success:true,
    data:article
  }
}
function* modify(next){
  const id = this.params.id;
  const result = yield Article.findByIdAndUpdate(id,{$set:this.request.body}).exec()
    .catch(err => {
     utils.logger.error(err);
     this.throw(500,'内部错误')
    });
  this.status = 200;
  utils.print(article);
  this.body = {
    success:true,
    data:result
  }
}
function* hiddenArticleList(next){
  const limit = ~~this.query.limit,
    page = ~~this.query.page;
  let skip;
  if(page === 0){
    skip = 0
  }else{
    skip = limit * (page - 1)
  }
  const articleArr = yield Article.find({hidden:true})
    .populate('tags')
    .select('title author visits tags createTime lastEditTime excerpt hidden')
    .limit(limit).skip(skip).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
  this.status = 200;
  utils.print(articleArr);
  this.body = {
    success:true,
    data:articleArr
  }
}

function* hiddenArticleDetail(next){
  const id = this.params.id;
  const article = yield Article.findOne({_id:id,hidden:true})
    .populate('tags')
    .select('title author visits tags createTime lastEditTime excerpt content hidden')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
  this.status = 200;
  utils.print(article);
  this.body = {
    success:true,
    data:article
  }
}
