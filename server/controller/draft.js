/**
 * Created by chuck7 on 16/9/14.
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc

const errorList = require('../error')

const Joi = require('joi')

const {
    drafts: ROUTER_NAME
} = require('../config').routerName

const Draft = require('../model/draft.js')

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, mw.verifyToken, new ActionCreate().getAOPMiddleWare())
    router.patch(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionModify().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`, mw.verifyToken, new ActionList().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionDetail().getAOPMiddleWare())
    router.delete(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionDelete().getAOPMiddleWare())
}

class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        title: Joi.string().required()
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
        const title = ctx.request.body.title
        const createTime = new Date()
        const lastEditTime = new Date()
        const excerpt = ''
        const content = ''
        const article = null
        const draftPublished = false

        let draft = null

        try {
            draft = Draft.create({
                title,
                createTime,
                lastEditTime,
                excerpt,
                content,
                article,
                draftPublished
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
            data: draft
        }

        return next()
    }
}

class ActionList extends BaseAction {
    async main (ctx, next) {
        const tag = ctx.query.tag
        let result = []
        try {
            result = await Draft.find(tag)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
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

class ActionDetail extends BaseAction {
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

    async main (ctx, next) {
        const id = ctx.params.id
        let result = []
        try {
            result = await Draft.findOne(id)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200
        ctx.body = {
            success: true,
            data: result
        }
    }
}

class ActionModify extends BaseAction {
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

    async main (ctx, next) {
        const id = ctx.params.id
        const modifyOption = ctx.request.body
        if (modifyOption.content) {
            const contentArr = modifyOption.content.split('<!-- more -->')
            if (contentArr.length > 1) {
                modifyOption.excerpt = contentArr[0]
            } else {
                modifyOption.excerpt = ''
            }
        }
        modifyOption.lastEditTime = new Date()
        modifyOption.draftPublished = false
        let result = null
        try {
            result = await Draft.update(id, modifyOption)
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

        utils.print(result)
        ctx.status = 200
        ctx.body = {
            success: true,
            data: result
        }
        return next()
    }
}

class ActionDelete extends BaseAction {
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
        let draft = null
        try {
            draft = await Draft.findOne(id)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        if (draft === null) {
            ctx.throw(400, errorList.idNotExistError.name, {
                message: errorList.idNotExistError.message
            })
        }
        if (draft.article !== null) {
            ctx.throw(403, errorList.deleteAlreadyPublishedDraftError.name, {
                message: errorList.deleteAlreadyPublishedDraftError.message
            })
        }
        try {
            await Draft.delete(id)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success: true
        }
        return next()
    }
}
