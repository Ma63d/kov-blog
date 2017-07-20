/**
 * Created by chuck7 on 16/8/17.
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const BaseAOP = require('../util/aop').BaseAOP
const __before = require('../util/aop').beforeFunc
const __after = require('../util/aop').afterFunc
const main = require('../util/aop').main

const errorList = require('../error')

const Joi = require('joi')

const {
    articles: ROUTER_NAME
} = require('../config').routerName

const ArticleService = require('../service/article.js')

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, mw.verifyToken, new ActionCreate().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}/:id`, new ActionDetail().getAOPMiddleWare())
    router.patch(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionModify().getAOPMiddleWare())
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

class ActionCreate extends BaseAOP {
    static schema = Joi.object().keys({
        title: Joi.string().required(),
        tags: Joi.array().items(Joi.number()).unique().allow(null),
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
    async [main] (ctx, next) {
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
            result = await ArticleService.create({
                title,
                visits,
                createTime,
                lastEditTime,
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

class ActionList extends BaseAOP {
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

    async [main] (ctx, next) {
        const tag = ctx.query.tag
        if (undefined !== tag) {
            // 搜索指定 tag 的文章
            try {
                let articleArr = await ArticleService.findWithTag(tag)
                utils.print(articleArr)
                ctx.body = {
                    success: true,
                    data: articleArr
                }
            } catch (e) {
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
                const [articleArr, totalNumber] = await Promise.all([
                    ArticleService.find({}, limit, skip),
                    ArticleService.count()
                ])
                ctx.status = 200

                ctx.body = {
                    success: true,
                    data: {
                        articles: articleArr,
                        total: totalNumber
                    }
                }
            } catch (e) {
                utils.print(e)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        }
        return next()
    }
}

class ActionDetail extends BaseAOP {
    static schema = Joi.object().keys({
        id: Joi.objectId().required()
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

    async [main] (ctx, next) {
        const id = ctx.params.id

        let article
        try {
            article = await ArticleService.findOne(id)
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        if (article) {
            article = article.toObject()
            try {
                [article.nextArticle, article.prevArticle] = await Promise.all([
                    ArticleService.findPrev()
                ])
            } catch (e) {
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
        ArticleService.incVisits(ctx.state.article).catch(e => {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        })
        return next()
    }
}

class ActionModify extends BaseAOP {
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

    async [main] (ctx, next) {
        const id = ctx.parasm.id
        const body = ctx.request.body

        let article = null
        try {
            article = await ArticleService.update(id, body)
        } catch (e) {
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
