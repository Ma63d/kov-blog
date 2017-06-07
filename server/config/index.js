/**
 * Created by chuck7 on 16/7/19.
 */

const path = require('path')
const base = require('./base')
const dev = require('./dev.js')
const fs = require('fs')
const _ = require('lodash')

// 默认输出base config
let config = base

// 本地调试环境
if (process.env.NODE_ENV === 'development') {
    config = _.merge(base, dev)
}
// 私有配置
if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(path.join(__dirname, 'private.js'))) {
        config = _.merge(config, require('./private.js'))
    }
}

module.exports = config
