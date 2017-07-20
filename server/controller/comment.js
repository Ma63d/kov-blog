/**
 * @file comment controller
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/6/8
 */

const utils = require('../util/index')

const BaseAOP = require('../util/aop').BaseAOP
const __before = require('../util/aop').beforeFunc
const main = require('../util/aop').main

const errorList = require('../error')

const Joi = require('joi')

const {
    comments: ROUTER_NAME
} = require('../config').routerName

const CommentService = require('../service/comment.js')

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, new ActionCreate().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
}

/**
 * post body
 * {
    "article": "评论所属文章 Id ",
    "message": "评论内容",
    "respondTo": "回复的评论 Id",
    "author": "作者 Id"
    }
 */

class ActionCreate extends BaseAOP {
    static schema = Joi.object().keys({
        article: Joi.objectId().required(),
        message: Joi.string().required(),
        respondTo: Joi.string().required(),
        author: Joi.string().required(),
        authorAvatar: Joi.string().optional()
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
            article,
            message,
            createTime = new Date(),
            respondTo,
            author,
            authorAvatar = '',
            likes = 0
        } = ctx.request.body

        let result = null

        try {
            result = await CommentService.create({
                article,
                message,
                createTime,
                respondTo,
                author,
                authorAvatar,
                likes
            })
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            data: result
        }

        return next()
    }
}

class ActionList extends BaseAOP {
    static schema = Joi.object().keys({
        article: Joi.objectId().required(),
        limit: Joi.number().optional(),
        page: Joi.number().optional()
    })

    async [__before] (ctx, next) {
        const query = ctx.query

        const {error} = Joi.validate({
            article: query.article,
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
        const article = ctx.query.article

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
                CommentService.find(article, limit, skip),
                CommentService.count()
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

        return next()
    }
}
