/**
 * Created by chuck7 on 16/8/16.
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const Tag = require('../model/tag.js')
const Article = require('../model/article.js')
const Draft = require('../model/draft.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc

const errorList = require('../error')

const Joi = require('joi')

const {
    tags: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, mw.verifyToken, new ActionCreate().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
    router.patch(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionModify().getAOPMiddleWare())
    router.delete(`/${ROUTER_NAME}/:id`, mw.verifyToken, new ActionDelete().getAOPMiddleWare())
}

class ActionList extends BaseAction {
    static schema = Joi.object().keys({
        startWith: Joi.string().optional()
    })

    async [__before] (ctx, next) {
        const queryStartWith = ctx.query['start-with']

        const {error} = Joi.validate({
            startWith: queryStartWith
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
        const queryStartWith = ctx.query['start-with']

        let tagList = null

        try {
            tagList = await Tag.find(queryStartWith)
        } catch (e) {
            utils.logger.error(ctx, 'error happens with follow ctx.')
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            data: tagList
        }
        return next()
    }
}

class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        name: Joi.string().min(1).required()
    })

    async [__before] (ctx, next) {
        const name = ctx.request.body.name

        const {error} = Joi.validate({
            name
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
        const tagName = ctx.request.body.name

        let tag = null

        try {
            tag = await Tag.findOne(null, tagName)
        } catch (e) {
            utils.logger.error(ctx, 'error happens with follow ctx.')
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        if (tag !== null) {
            ctx.status = 200
            // 标签已存在
            ctx.body = {
                success: false,
                data: {
                    id: tag.id
                }
            }
            return next()
        }

        try {
            tag = await Tag.create({
                name: tagName
            })
        } catch (e) {
            utils.logger.error(ctx, 'error happens with follow ctx.')
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                id: tag.id
            }
        }
        return next()
    }
}

class ActionModify extends BaseAction {
    static schema = Joi.object().keys({
        name: Joi.string().min(1).required(),
        id: Joi.objectId().required()
    })

    async [__before] (ctx, next) {
        const name = ctx.request.body.name
        const id = ctx.params.id
        const {error} = Joi.validate({
            name,
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
        const tagName = ctx.request.body.name
        const tagId = ctx.params.id
        let tag = null
        try {
            tag = await Tag.findOne(null, tagName)
        } catch (e) {
            utils.logger.error(ctx, 'error happens with follow ctx.')
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        utils.print(tag)

        if (tag !== null) {
            ctx.status = 200
            ctx.body = {
                success: false,
                data: {
                    id: tag.id
                }
            }
        } else {
            await Tag.update(tagId, tagName)
            ctx.status = 200
            ctx.body = {
                success: true
            }
        }
        return next()
    }
}

class ActionDelete extends BaseAction {
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
        try {
            await Promise.all([
                Draft.deleleTag(id),
                Article.deleleTag(id),
                Tag.delete(id)
            ])
        } catch (e) {
            utils.logger.error(ctx, 'error happens with follow ctx.')
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
