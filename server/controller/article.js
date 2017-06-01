/**
 * Created by chuck7 on 16/8/17.
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc
const __after = require('./base').afterFunc

const errorList = require('../error')

const Joi = require('joi')

module.exports.init = router => {
    router.post('/articles', mw.verify_token, create)
    router.get('/articles', articleList)
    router.get('/articles/:id', articleDetail)
    router.patch('/articles/:id', mw.verify_token, modify)
    router.get('/hidden-articles', mw.verify_token, hiddenArticleList)
    router.get('/hidden-articles/:id', mw.verify_token, hiddenArticleDetail)
}

const Article = require('../model/article.js')
class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        title: Joi.string().required(),
        tags: Joi.array().items(Joi.number()).unique(),
        hidden: Joi.boolean().required(),
        excerpt: Joi.string().required(),
        content: Joi.string().required()
    })

    async [__before] (ctx, next) {
        const body = ctx.request.body
        const {error} = Joi.validate(body, this.constructor.schema, {allowUnknown: true})
        if (error) {
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }
    async main (ctx, next) {
        const {
            title,
            visits = 0,
            createTime = new Date(),
            lastEditTime = null,
            hidden = false,
            excerpt,
            content,
            comments = []
        } = ctx.request.body

        let result = null

        try {
            result = await Article.create({
                title,
                visits,
                createTime,
                lastEditTime,
                hidden,
                excerpt,
                content,
                comments
            })
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                id: result._id
            }
        }

        return next()
    }
}

class ActionGetList extends BaseAction {

    static schema = Joi.object().keys({
        tag: Joi.string().optional(),
        limit: Joi.number().optional(),
        page: Joi.number().optional()
    }).without('tag', 'page')

    async [__before] (ctx, next) {
        const body = ctx.request.body
        const query = ctx.query

        const {error} = Joi.validate({
            tag: query.tag,
            limit: ~~query.limit,
            page: query.page
        }, this.constructor.schema)

        if (error) {
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }

        return next()
    }

    async main (ctx, next) {
        const tag = this.query.tag
        if(undefined !== tag){
            utils.print(tag)
            let articleArr = yield Article.find({
                hidden:false,
                tags:{"$all":[tag]}
            }).select('title createTime lastEditTime')
                .sort({ createTime: -1})
                .exec().catch(err => {
                    utils.logger.error(err)
                    this.throw(500,'内部错误')
                })
            utils.print(articleArr)
            this.body = {
                success:true,
                data:articleArr
            }
        }else{
            const limit = ~~this.query.limit || 10,
                page = ~~this.query.page
            let skip
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
                        utils.logger.error(err)
                        this.throw(500,'内部错误')
                    }),
                totalNumber: Article.count().exec().catch(err => {
                    utils.logger.error(err)
                    this.throw(500,'内部错误')
                })
            }
            this.status = 200
            const resultArr = []
            if(articleArr.length){
                articleArr.forEach((article,index,arr)=>{
                    article = article.toObject()
                    /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
                     if(null !== article.lastEditTime){
                     article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
                     }*/
                    resultArr.push(article)
                    utils.print(article)
                })
            }

            utils.print(resultArr)
            this.body = {
                success:true,
                data:{
                    articles:resultArr,
                    total:totalNumber
                }
            }
        }
        return next()
    }
}


function* articleList(next){
  /**
   * @query tag  搜索包含指定标签的文章
   * @param page 文章列表页码 从1开始
   * @param limit 每页文章数量
   * */
  const tag = this.query.tag
  if(undefined !== tag){
    utils.print(tag)
    let articleArr = yield Article.find({
      hidden:false,
      tags:{"$all":[tag]}
    }).select('title createTime lastEditTime')
      .sort({ createTime: -1})
      .exec().catch(err => {
        utils.logger.error(err)
        this.throw(500,'内部错误')
      })
    utils.print(articleArr)
    this.body = {
      success:true,
      data:articleArr
    }
  }else{
    const limit = ~~this.query.limit || 10,
      page = ~~this.query.page
    let skip
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
          utils.logger.error(err)
          this.throw(500,'内部错误')
        }),
      totalNumber: Article.count().exec().catch(err => {
        utils.logger.error(err)
        this.throw(500,'内部错误')
      })
    }
    this.status = 200
    const resultArr = []
    if(articleArr.length){
      articleArr.forEach((article,index,arr)=>{
        article = article.toObject()
        /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
         if(null !== article.lastEditTime){
         article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
         }*/
        resultArr.push(article)
        utils.print(article)
      })
    }

    utils.print(resultArr)
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
  const id = this.params.id
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    this.throw(400,'invalid id')
  }
  let article = (yield Article.findOne({_id:id,hidden:false})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt content')
    .exec().catch(err => {
      utils.logger.error(err)
      this.throw(500,'内部错误')
    }))

  this.status = 200
  if(article){
    article = article.toObject()
    /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
    if(null !== article.lastEditTime){
      article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
    }*/
    ({ nextArticle:article.nextArticle, prevArticle:article.prevArticle } = yield {
      nextArticle: Article.findOne({_id: {$gt: article._id}},'title _id').exec().catch(err => {
        utils.logger.error(err)
        this.throw(500,'内部错误')
      }),
      prevArticle: Article.findOne({_id: {$lt: article._id}},'title _id').sort({_id:-1}).exec().catch(err => {
        utils.logger.error(err)
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
  const id = this.params.id
  let article = yield Article.findByIdAndUpdate(id,{$set:this.request.body},{new:true}).exec()
    .catch(err => {
      if(err.name === 'CastError'){
        this.throw(400,'id不存在')
      }else{
        utils.logger.error(err)
        this.throw(500,'内部错误')
      }
    })
  article = article.toObject()
  /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
  if(null !== article.lastEditTime){
    article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
  }*/
  this.status = 200
  utils.print(article)
  this.body = {
    success:true,
    data:article
  }
}
function* hiddenArticleList(next){
  const limit = ~~this.query.limit,
    page = ~~this.query.page
  let skip
  if(page === 0){
    skip = 0
  }else{
    skip = limit * (page - 1)
  }
  const articleArr = yield Article.find({hidden:true})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt hidden')
    .limit(limit).skip(skip).exec().catch(err => {
      utils.logger.error(err)
      this.throw(500,'内部错误')
    })
  this.status = 200
  const resultArr = []
  if(articleArr.length){
    articleArr.forEach((article,index,arr)=>{
      article = article.toObject()
      /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
      if(null !== article.lastEditTime){
        article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
      }*/
      resultArr.push(article)
      utils.print(article)
    })
  }
  utils.print(resultArr)
  this.body = {
    success:true,
    data:resultArr
  }
}

function* hiddenArticleDetail(next){
  const id = this.params.id
  let article = yield Article.findOne({_id:id,hidden:true})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt content hidden')
    .exec().catch(err => {
      utils.logger.error(err)
      this.throw(500,'内部错误')
    })
  this.status = 200
  if(article){
    article = article.toObject()
    /*article.createTime = new Date(article.createTime).format('yyyy-MM-dd hh:mm')
    if(null !== article.lastEditTime){
      article.lastEditTime = new Date(article.lastEditTime).format('yyyy-MM-dd hh:mm')
    }*/
  }
  utils.print(article)
  this.body = {
    success:true,
    data:article
  }
}
