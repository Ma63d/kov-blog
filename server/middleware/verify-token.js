/**
 * Created by chuck7 on 16/8/16.
 */

const utils = require('../util/index.js')
const config = require('../config/index.js')

const thenifyAll = require('thenify-all')

let jwt = require('jsonwebtoken')
jwt = thenifyAll(jwt, {}, ['verify'])

const errorList = require('../error')

module.exports = async function (ctx, next) {
    const authorization = ctx.get('Authorization')
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http header \'Authorization\'')
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
