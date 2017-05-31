/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    avatar: String,
    createTime: String
})

module.exports = mongoose.model('user', userSchema)
