/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const utils = require('../util/index')

const commentSchema = new Schema({
    article: {
        id: Schema.Types.ObjectId,
        ref: 'article'
    },
    message: String,
    respondTo: {
        id: Schema.Types.ObjectId,
        ref: 'comment'
    },
    createTime: {
        type: Date
    },
    author: String,
    authorAvatar: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    }
})

commentSchema.set('toJSON', {
    getters: true,
    virtuals: true
})
commentSchema.set('toObject', {
    getters: true,
    virtuals: true
})

commentSchema.path('createTime').get(function (v) {
    return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
})

module.exports = mongoose.model('comment', commentSchema)
