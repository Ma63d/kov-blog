/**
 * Created by chuck7 on 16/8/11.
 */
"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const tagSchema = new Schema({
    name: String
})
module.exports = mongoose.model('tag', tagSchema);
