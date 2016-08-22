/**
 * Created by chuck7 on 16/8/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const commentSchema =  new Schema( {
    article: {
      id: Schema.Types.ObjectId,
      ref: 'article'
    },
    message:String,
    respondTo: {
      id: Schema.Types.ObjectId,
      ref: 'comment'
    },
    createTime: {
      type: Date
    },
    author:String,
    authorAvatar:{
      type: String,
      default: ''
    },
    duoshuoKey: {
      type: String,
      default: ''
    },
    likes:{
      type: Number,
      default: 0
    }
})
module.exports = mongoose.model('comment', commentSchema);
