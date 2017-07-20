/**
 * @file schema tag
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tagSchema = new Schema({
    name: String
}, {
    versionKey: false
})
tagSchema.set('toJSON', {getters: true, virtuals: true})
tagSchema.set('toObject', {getters: true, virtuals: true})
module.exports = mongoose.model('tag', tagSchema)
