/**
 * @file 基础 controller ，加入切面编程逻辑
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/31
 */

let __before = module.exports.beforeFunc = ['__before']
let __after = module.exports.afterFunc = ['__after']

module.exports.BaseAction = class BaseAction {
    static factory (actionInstance) {
        let before = actionInstance[__before]
        let main = actionInstance['main']
        let after = actionInstance[__after]
        if (before || after) {
            return async function (ctx, next) {
                if (before) {
                    main = main.bind(this, ctx,
            after
              ? after.bind(this, ctx, next)
              : next
          )
                    return before.call(this, ctx, main)
                }
                return main.call(this, ctx,
          after
            ? after.bind(this, ctx, next)
            : next)
            }
        }
        return main
    }
}
