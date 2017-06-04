/**
 * Created by chuck7 on 16/8/15.
 */

const jwt = require('jsonwebtoken')

const configs = require('../config/index')
const utils = require('../util/index')

const mw = require('../middleware/index.js')
const md5 = require('md5')

const cert = configs.jwt.cert
const User = require('../model/user.js')

const BaseAction = require('./base').BaseAction
const __before = require('./base').beforeFunc

const errorList = require('../error')

const Joi = require('joi')

const {
    tokens: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    await seed()
    router.post(`/${ROUTER_NAME}`, create)
    router.get(`/${ROUTER_NAME}/check`, mw.verify_token, check)
}

// 生成初始admin用户账号
// 初始账号:'admin'
// 初始密码:'password'
async function seed () {
    let user = null

    try {
        user = await User.findOne()

        if (user === null) {
            user = new User({
                name: 'admin',
                username: 'admin',
                password: md5('password').toUpperCase(),
                avatar: '',
                createTime: new Date()
            })
        }
    } catch (e) {
        utils.logger.error('error happens when seeding error')
        utils.print('data seeding failed, please check the error and restart the server')
        let error = new Error(errorList.seedingError.message)
        error.name = errorList.seedingError.name
        throw error
    }
}

class ActionCreate extends BaseAction {
    static schema = Joi.object().keys({
        username: Joi.string().min(1).required(),
        password: Joi.string().min(1).required()
    })

    async [__before] (ctx, next) {
        const username = this.request.body.username
        const password = this.request.body.password

        const {error} = Joi.validate({
            username,
            password
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
        const username = this.request.body.username
        const password = this.request.body.password
        let user = null
        try {
            user = await User.findOne(username)
        } catch (e) {
            utils.logger.error('error happens with the ctx:', ctx)
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        if (user !== null) {
            if (user.password === password) {
                const token = jwt.sign({
                    uid: user._id,
                    name: user.name,
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60// 24 hours
                }, cert)
                utils.print(token)
                ctx.status = 200
                ctx.body = {
                    success: true,
                    data: {
                        uid: user._id,
                        name: user.name,
                        token
                    }
                }
            } else {
                ctx.throw(401, errorList.passwordError.name, {
                    message: errorList.passwordError.message
                })
            }
        } else {
            ctx.throw(401, errorList.usernameError.name, {
                message: errorList.usernameError.message
            })
        }
    }
}

async function check (ctx, next) {
    ctx.status = 200
    ctx.body = {
        success: true,
        message: '验证通过'
    }
}
