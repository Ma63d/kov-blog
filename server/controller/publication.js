/**
 * Created by chuck7 on 16/9/15.
 * this router is used for making a draft into a public article
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const Draft = require('../model/draft.js')
const Article = require('../model/article.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc

const errorList = require('../error')

const Joi = require('joi')

const {
    publications: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, mw.verify_token, new ActionCreate().getAOPMiddleWare())
}

class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        draftId: Joi.objectId().required()
    })

    async [__before] (ctx, next) {
        const draftId = ctx.request.body.draftId

        const {error} = Joi.validate({
            draftId
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
        const draftId = ctx.request.body.draftId
        let draft = null
        try {
            draft = await Draft.findOne(draftId)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        if (draft === null) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(400, errorList.idNotExistError.name, {
                message: errorList.idNotExistError.message
            })
        }
        const schema = Joi.object().keys({
            title: Joi.string().min(1).required(),
            excerpt: Joi.string().min(1).required(),
            content: Joi.string().min(1).required()
        })
        const {error} = Joi.validate(draft, schema, {
            allowUnknown: true
        })

        if (error) {
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }

        draft.draftPublished = true
        draft.lastEditTime = new Date()

        const articleOption = {
            ...draft
        }
        delete articleOption._id
        delete articleOption.id
        delete articleOption.draftPublished
        delete articleOption.article
        delete articleOption.createTime

        const id = draft.id
        delete draft._id
        delete draft.id

        let article = null

        if (draft.article !== null) {
            try {
                [, article] = await Promise.all([
                    Draft.update(id, draft),
                    Article.update(draft.article, articleOption)
                ])
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        } else {
            articleOption.createTime = new Date()
            delete articleOption.lastEditTime
            articleOption.visits = 0
            articleOption.comments = []

            try {
                article = await Article.create(articleOption)
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }

            draft.article = article._id

            try {
                draft = await Draft.update(id, draft)
            } catch (e) {
                utils.logger.error('error happens with the ctx:', ctx)
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                article
            }
        }
        return next()
    }
}
