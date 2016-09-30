/**
 * Created by chuck7 on 16/8/7.
 */
"use strict"
const fs = require('fs'),
  middlewares = {},
  files = fs.readdirSync(__dirname);
for(let file of files){
  if(file !== 'index.js'){
    const fileName = file.split('.')[0];
    middlewares[fileName] = require('./'+file)
  }
}
module.exports = middlewares;
