/**
 * Created by chuck7 on 16/9/21.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const meSchema =  new Schema( {
  content: String,
},{ versionKey: false});
const me =  mongoose.model('me', meSchema);
module.exports = me;
