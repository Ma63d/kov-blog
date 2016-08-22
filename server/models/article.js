/**
 * Created by chuck7 on 16/8/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const articleSchema =  new Schema( {
    title: String,
    author: String,
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
    hidden: Boolean,
    excerpt: String,
    content: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }]
});
const article =  mongoose.model('article', articleSchema);
module.exports = article;
