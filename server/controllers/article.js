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
  router.get('/hidden-articles', mw.verify_token, hiddenArticleList);
  router.get('/hidden-articles/:id', mw.verify_token, hiddenArticleDetail);
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
  }else if(!(hidden === true || hidden === false)){
    this.throw(400,`'hidden'字段错误`)
  }else if(content=== undefined || content.length ===0){
    this.throw(400,`文章内容不能为空`)
  }
  const article = new Article({
    title,
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
  /**
   * @query tag  搜索包含指定标签的文章
   * @param page 文章列表页码 从1开始
   * @param limit 每页文章数量
   * */
  const tag = this.query.tag;
  if(undefined !== tag){
    utils.print(tag);
    let articleArr = yield Article.find({
      hidden:false,
      tags:{"$all":[tag]}
    }).select('title createTime lastEditTime')
      .sort({ createTime: -1})
      .exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      });
    utils.print(articleArr);
    this.body = {
      success:true,
      data:articleArr
    }
  }else{
    const limit = ~~this.query.limit || 10,
      page = ~~this.query.page;
    let skip;
    if(page === 0){
      skip = 0
    }else{
      skip = limit * (page - 1)
    }
    const {articleArr,totalNumber} = yield {
      articleArr: Article.find({hidden:false})
        .populate('tags')
        .select('title visits tags createTime lastEditTime excerpt')
        .sort({ createTime: -1})
        .limit(limit).skip(skip).exec().catch(err => {
          utils.logger.error(err);
          this.throw(500,'内部错误')
        }),
      totalNumber: Article.count().exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      })
    }
    this.status = 200;
    const resultArr = [];
    if(articleArr.length){
      articleArr.forEach((article,index,arr)=>{
        article = article.toObject();
        /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm');
         if(null !== article.lastEditTime){
         article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm');
         }*/
        resultArr.push(article);
        utils.print(article);
      })
    }

    utils.print(resultArr);
    this.body = {
      success:true,
      data:{
        articles:resultArr,
        total:totalNumber
      }
    }
  }

}
function* articleDetail(next){
  const id = this.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    this.throw(400,'invalid id');
  }
  let article = (yield Article.findOne({_id:id,hidden:false})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt content')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    }));

  this.status = 200;
  if(article){
    article = article.toObject();
    /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm');
    if(null !== article.lastEditTime){
      article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm');
    }*/
    ({ nextArticle:article.nextArticle, prevArticle:article.prevArticle } = yield {
      nextArticle: Article.findOne({_id: {$gt: article._id}},'title _id').exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }),
      prevArticle: Article.findOne({_id: {$lt: article._id}},'title _id').sort({_id:-1}).exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      })
    })
  }

  this.body = {
    success:true,
    data:article
  }
}
function* modify(next){
  const id = this.params.id;
  let article = yield Article.findByIdAndUpdate(id,{$set:this.request.body},{new:true}).exec()
    .catch(err => {
      if(err.name === 'CastError'){
        this.throw(400,'id不存在');
      }else{
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }
    });
  article = article.toObject();
  /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm');
  if(null !== article.lastEditTime){
    article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm');
  }*/
  this.status = 200;
  utils.print(article);
  this.body = {
    success:true,
    data:article
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
    .select('title visits tags createTime lastEditTime excerpt hidden')
    .limit(limit).skip(skip).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
  this.status = 200;
  const resultArr = [];
  if(articleArr.length){
    articleArr.forEach((article,index,arr)=>{
      article = article.toObject();
      /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm');
      if(null !== article.lastEditTime){
        article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm');
      }*/
      resultArr.push(article);
      utils.print(article);
    })
  }
  utils.print(resultArr);
  this.body = {
    success:true,
    data:resultArr
  }
}

function* hiddenArticleDetail(next){
  const id = this.params.id;
  let article = yield Article.findOne({_id:id,hidden:true})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt content hidden')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
  this.status = 200;
  if(article){
    article = article.toObject();
    /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm');
    if(null !== article.lastEditTime){
      article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm');
    }*/
  }
  utils.print(article);
  this.body = {
    success:true,
    data:article
  }
}
