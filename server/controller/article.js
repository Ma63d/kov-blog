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

const {
    articles: ROUTER_NAME
} = require('../config').routerName

const Article = require('../model/article.js')

module.exports.init = router => {
    router.post(`/${ROUTER_NAME}`, mw.verify_token, BaseAction.factory(new ActionCreate()))
    router.get(`/${ROUTER_NAME}`, BaseAction.factory(new ActionList()))
    router.get(`/${ROUTER_NAME}/:id`, BaseAction.factory(new ActionDetail()))
    router.patch(`/${ROUTER_NAME}/:id`, mw.verify_token, BaseAction.factory(new ActionModify()))
}

/**
 * post body
 * {
    "title":"标题",
    "author":"作者",
    "tags":[],
    "excerpt":"摘要 或 首段",
    "content":"文章内容"
    }
 */

class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        title: Joi.string().required(),
        tags: Joi.array().items(Joi.number()).unique(),
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
                excerpt,
                content,
                comments
            })
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
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

class ActionList extends BaseAction {
    static schema = Joi.object().keys({
        tag: Joi.string().optional(),
        limit: Joi.number().optional(),
        page: Joi.number().optional()
    }).without('tag', 'page')

    async [__before] (ctx, next) {
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
        const tag = ctx.query.tag
        if (undefined !== tag) {
            // 搜索指定 tag 的文章
            try {
                let articleArr = await Article.findWithTag(tag)
                utils.print(articleArr)
                ctx.body = {
                    success: true,
                    data: articleArr
                }
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        } else {
            // 查询文章列表
            const limit = ~~ctx.query.limit || 10
            const page = ~~ctx.query.page
            let skip
            if (page === 0) {
                skip = 0
            } else {
                skip = limit * (page - 1)
            }
            try {
                const [articleArr, totalNumber] = await Promise.all(
                    Article.find({}, limit, skip),
                    Article.count().exec()
                )
                ctx.status = 200
                const resultArr = []
                if (articleArr.length) {
                    articleArr.forEach(article => {
                        article = article.toObject()
                        resultArr.push(article)
                        utils.print(article)
                    })
                }

                utils.print(resultArr)
                ctx.body = {
                    success: true,
                    data: {
                        articles: resultArr,
                        total: totalNumber
                    }
                }
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        }
        return next()
    }
}

class ActionDetail extends BaseAction {
    static schema = Joi.object().keys({
        id: Joi.objectId()
    })

    async [__before] (ctx, next) {
        const id = ctx.params.id

        const {error} = Joi.validate({
            id
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
        const id = ctx.params.id

        let article
        try {
            article = await Article.findOne(id)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        if (article) {
            article = article.toObject()
            try {
                [article.nextArticle, article.prevArticle] = await Promise.all([
                    Article.findPrev()
                ])
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        }

        ctx.body = {
            success: true,
            data: article
        }
        ctx.state.article = article

        return next()
    }

    async [__after] (ctx, next) {
        Article.incVisits(ctx.state.article).catch(e => {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        })
        return next()
    }
}

class ActionModify extends BaseAction {
    static schema = Joi.object().keys({
        id: Joi.objectId(),
        body: Joi.object()
    })

    async [__before] (ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body

        const {error} = Joi.validate({
            id,
            body
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
        const id = ctx.parasm.id
        const body = ctx.request.body

        let article = null
        try {
            article = await Article.update(id, body)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            if (e.name === 'CastError') {
                ctx.throw(400, errorList.idNotExistError.name, {
                    message: errorList.idNotExistError.message
                })
            }

            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200

        utils.print(article)

        ctx.body = {
            success: true,
            data: article
        }
    }
}
