/**
 * @file scheme me
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const meSchema = new Schema({
    content: String
}, {
    versionKey: false
})

const me = mongoose.model('me', meSchema)
module.exports = me
