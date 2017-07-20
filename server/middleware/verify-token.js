/**
 * Created by chuck7 on 16/8/16.
 */

const utils = require('../util/index.js')
const config = require('../config/index.js')

const thenifyAll = require('thenify-all')
const BaseAOP = require('../util/aop').BaseAOP
const __before = require('../util/aop').beforeFunc
const __after = require('../util/aop').afterFunc
const main = require('../util/aop').main

let jwt = require('jsonwebtoken')
jwt = thenifyAll(jwt, {}, ['verify'])

const errorList = require('../error')

const timeRecorder = new WeakMap();

class VerifyToken extends BaseAOP {
    async [__before] (ctx, next) {
        timeRecorder.set(ctx, Date.now())
        return next()
    }

    async [main] (ctx, next) {
        const authorization = ctx.get('Authorization')
        if (authorization === '') {
            ctx.throw(401, errorList.noneTokenError.name, {
                message: errorList.noneTokenError.message
            })
        }
        const token = authorization.split(' ')[1]
        let tokenContent
        try {
            tokenContent = await jwt.verify(token, config.jwt.cert)
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                ctx.throw(401, errorList.tokenExpiredError.name, {
                    message: errorList.tokenExpiredError.message
                })
            }
            ctx.throw(401, errorList.invalidTokenError.name, {
                message: errorList.invalidTokenError.message
            })
        }
        utils.print('鉴权通过')
        ctx.token = tokenContent
        return next()
    }

    async [__after] (ctx, next) {
        const start = timeRecorder.get(ctx)
        const end = Date.now()
        // todo: store timespan
        utils.print(end - start)
        return next()
    }
}
module.exports = new VerifyToken().getAOPMiddleWare()
