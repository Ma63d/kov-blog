/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/7/14
 */
const utils = require('../util/index.js')
const BaseAOP = require('../util/aop').BaseAOP
const __before = require('../util/aop').beforeFunc
const __after = require('../util/aop').afterFunc
const main = require('../util/aop').main

class ContextLogger extends BaseAOP {
    async [main] (ctx, next) {
        try {
            await next
        } catch (e) {
            utils.logger(ctx, 'context')
            throw e
        }
    }
}
module.exports = new ContextLogger().getAOPMiddleWare()
