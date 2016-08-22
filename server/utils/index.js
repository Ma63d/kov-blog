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
