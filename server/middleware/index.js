/**
 * Created by chuck7 on 16/8/7.
 */

const fs = require('fs')
const middlewares = {}
const files = fs.readdirSync(__dirname)

const camelRe = /-(\w)/g
const camelize = (str) => {
    return str.replace(camelRe, (_, c) => c.toUpperCase())
}
for (let file of files) {
    if (file !== 'index.js') {
        const fileName = file.split('.')[0]
        middlewares[camelize(fileName)] = require('./' + file)
    }
}
module.exports = middlewares
