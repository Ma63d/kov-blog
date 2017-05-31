/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
module.exports = mongoose.model('comment', commentSchema)
