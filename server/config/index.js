/**
 * Created by chuck7 on 16/7/19.
 */

const path = require('path'),
    base = require('./base'),
    dev = require('./dev.js'),
    fs = require('fs'),
    _ = require('lodash')

// 默认输出base config
let config = base

// 本地调试环境
if (process.env.NODE_ENV === 'development') {
    config = _.merge(base, dev)
}
// 私有配置
if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(__dirname + '/private.js')) {
        config = _.merge(config, require('./private.js'))
    }
}

module.exports = config
