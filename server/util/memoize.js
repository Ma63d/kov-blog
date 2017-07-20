/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/7/20
 */

const config = require('../config/index')
const LRU = require('lru-cache')
const options = {
    max: config.cache.size,
    maxAge: config.cache.maxAge
}

function memoize (target, name, descriptor) {
    let func = descriptor.value
    let cache = LRU(options)
    global.cache = cache
    descriptor.value = async function (...args) {
        const argsString = JSON.stringify(args)
        let result = cache.get(argsString)
        if (undefined !== result) {
            return result
        }
        result = await func.apply(this, args)
        cache.set(argsString, result)
        return result
    }
    return descriptor
}

module.exports = memoize
