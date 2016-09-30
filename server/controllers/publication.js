/**
 * Created by chuck7 on 16/9/15.
 */
"use strict"
const utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const Draft = require('../models/draft.js');
const Article = require('../models/article.js');
module.exports.init = router => {
  router.post('/publications', mw.verify_token, create);
}
function* create(){
  const draftId = this.request.body.draftId;
  const draft = yield Draft.findOne({_id:draftId})
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
  if(0 === draft.title.length){
    this.throw(400,'文章标题不能为空')
  }else if(0 === draft.excerpt.length){
    this.throw(400,`文章摘要不能为空,请在文章中插入'<!-- more -->'以分隔摘要和正文`);
  }else if(0 === draft.content.length){
    this.throw(400,'文章内容不能为空')
  }
  if(null !== draft.article){
    draft.draftPublished = true;
    draft.lastEditTime = new Date();
    const articleOption = draft.toObject();
    delete articleOption._id;
    delete articleOption.id;
    delete articleOption.draftPublished;
    delete articleOption.article;
    delete articleOption.createTime;
    let {article} = yield {
      draft: draft.save().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }),
      article: Article.findByIdAndUpdate(draft.article,{$set:articleOption},{new:true}).populate('tags').exec()
        .catch(err => {
          if(err.name === 'CastError'){
            this.throw(400,'article id 不存在');
          }else{
            utils.logger.error(err);
            this.throw(500,'内部错误')
          }
        })
    }
    article = article.toObject();
    this.status = 200;
    this.body = {
      success:true,
      data:{
        article
      }
    }
  }else{
    draft.draftPublished = true;
    draft.lastEditTime = new Date();
    const articleOption = draft.toObject();
    delete articleOption._id;
    delete articleOption.id;
    delete articleOption.draftPublished;
    delete articleOption.article;
    articleOption.createTime = articleOption.lastEditTime
    delete articleOption.lastEditTime;
    articleOption.visits = 0;
    articleOption.comments = [];
    articleOption.hidden = false;
    let article = new Article(articleOption);
    article = yield article.save().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
    article = article.toObject();
    draft.article = article._id;
    yield draft.save().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
    this.status = 200;
    this.body = {
      success:true,
      data:{
        article
      }
    }
  }
}
