/**
 * Created by chuck7 on 16/7/15.
 */

// register mongodb objectid validation for joi
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const config = require('./config/index')

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')({
    prefix: config.app.apiPath
})

const onerror = require('koa-onerror')

const mongoose = require('mongoose')
const controllers = require('./controller/index.js')
const utils = require('./util/index.js')

mongoose.Promise = global.Promise

;(async function () {
    mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
    /**
     * 将config注入中间件的ctx
     * */
    app.context.config = config

    /**
     * error信息优化
     * */
    onerror(app, {
        json (err) {
            Object.keys(err).reduce((body, key) => {
                body[key] = err[key]
                return body
            }, this.body = {})
            this.body.error = err.name
        }
    })

    app.on('error', function (err, ctx) {
        if ((ctx.status === 404 && err.status === undefined) || err.status === 500) {
            utils.logger.error('server error')
            utils.logger.error(err)
            utils.logger.error(ctx)
        }
        utils.print(err)
    })

    app.use(bodyParser())

    await controllers.init(router)
    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(config.app.port, () => {
        utils.print('app is listening on port ' + config.app.port)
    })
})().catch(function (err) {
    utils.print(err.stack)
})
