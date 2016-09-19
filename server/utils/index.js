/**
 * Created by chuck7 on 16/8/14.
 */
"use strict"
const Logger = require('mini-logger'),
  validator = require('validator'),
  config = require('../configs/index.js'),
  print = require('debug')('kov-blog'),
  utils = {};
module.exports = utils;
/**
 * debug plugin
 * */
utils.print = print;

/**
 * data validator
 * */
utils.validator = validator;

/**
 * log记录 用法: utils.logger.error(new Error(''))
 * */
utils.logger = Logger({
  dir: config.dir.log,
  format: 'YYYY-MM-DD-[{category}][.log]'
});

//将时间输出为统一的格式
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}
