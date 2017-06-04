/**
 * @file article schema
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const utils = require('../util')

const articleSchema = new Schema({
    title: String,
    visits: {
        type: Number,
        default: 0
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    createTime: {
        type: Date
    },
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    excerpt: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, {
    versionKey: false,
    skipVersioning: {
        tags: true
    }
})

articleSchema.set('toJSON', {
    getters: true,
    virtuals: true
}
)
articleSchema.set('toObject', {
    getters: true,
    virtuals: true
})

articleSchema.path('createTime').get(function (v) {
    return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
})
articleSchema.path('lastEditTime').get(function (v) {
    return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
})

const article = mongoose.model('article', articleSchema)
module.exports = article
