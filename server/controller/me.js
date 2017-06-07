/**
 * Created by chuck7 on 16/9/21.
 */

const utils = require('../util/index')
const mw = require('../middleware/index.js')

const Me = require('../model/me.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc

const errorList = require('../error')

const Joi = require('joi')

const {
    me: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    await seed()
    router.get(`/${ROUTER_NAME}`, new ActionDetail().getAOPMiddleWare())
    router.patch(`/${ROUTER_NAME}`, mw.verifyToken, new ActionModify().getAOPMiddleWare())
}

// 生成"关于我"页面的原始数据
async function seed () {
    let me = []
    try {
        me = await Me.findOne()
    } catch (e) {
        utils.logger.error('error happens when seeding error')
        let error = new Error(errorList.seedingError.message)
        error.name = errorList.seedingError.name
        throw error
    }

    // utils.print(me)
    if (me === null) {
        // 没啥用的初始化数据,那么就膜一下吧
        try {
            me = await Me.create({
                content: 'too young ,sometimes naive'
            })
        } catch (e) {
            utils.logger.error('error happens when seeding error')
            let error = new Error(errorList.seedingError.message)
            error.name = errorList.seedingError.name
            throw error
        }
    }
}

class ActionDetail extends BaseAction {
    async main (ctx, next) {
        let result = null
        try {
            result = await Me.findOne()
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

class ActionModify extends BaseAction {
    static schema = Joi.object().keys({
        content: Joi.string().required()
    })

    async [__before] (ctx, next) {
        const content = ctx.request.body.content

        const {error} = Joi.validate({
            content
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
        const content = ctx.request.body.content
        try {
            await Me.update(content)
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
