/**
 * Created by chuck7 on 16/8/14.
 */

const Logger = require('mini-logger'),
    config = require('../config/index.js'),
    print = require('debug')('kov-blog'),
    utils = {}
module.exports = utils
/**
 * debug plugin
 * */
utils.print = print

/**
 * log记录 用法: utils.logger.error(new Error(''))
 * */
utils.logger = Logger({
    dir: config.dir.log,
    format: 'YYYY-MM-DD-[{category}][.log]'
})

// 将时间输出为统一的格式
utils.formatDate = function (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,                 // 月份
        'd+': date.getDate(),                    // 日
        'h+': date.getHours(),                   // 小时
        'm+': date.getMinutes(),                 // 分
        's+': date.getSeconds(),                 // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()             // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
