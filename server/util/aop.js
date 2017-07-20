/**
 * @file 基础 controller ，加入切面编程逻辑
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/31
 */

let __before = module.exports.beforeFunc = Symbol('__before')
let __after = module.exports.afterFunc = Symbol('__after')
let main = module.exports.main = Symbol('main')

module.exports.BaseAOP = class BaseAOP {
    getAOPMiddleWare () {
        let before = this[__before]
        let mainFunc = this[main]
        let after = this[__after]
        let that = this

        if (before || after) {
            return async function (ctx, next) {
                let boundAfter = after
                    ? after.bind(that, ctx, next)
                    : next
                if (before) {
                    let boundMain = mainFunc.bind(that, ctx, boundAfter)
                    return before.call(that, ctx, boundMain)
                }
                return mainFunc.call(that, ctx, boundAfter)
            }
        }
        return mainFunc
    }
}
