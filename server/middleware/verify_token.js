/**
 * Created by chuck7 on 16/8/16.
 */

const utils = require('../util/index.js'),
  config = require('../config/index.js'),
  jwt = require("jsonwebtoken")
module.exports = function *(next) {
  const authorization = this.get('Authorization')
  if('' === authorization){
    this.throw(401,'no token detected in http header \'Authorization\'')
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try{
    tokenContent = yield jwt.co_verify(token,config.jwt.cert)
  }catch(err){
    if('TokenExpiredError' === err.name){
      this.throw(401,'token expired')
    }
    this.throw(401,'invalid token')
  }
  utils.print('鉴权通过')
  this.token = tokenContent
  return yield next
}
