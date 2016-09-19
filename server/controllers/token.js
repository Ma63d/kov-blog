/**
 * Created by chuck7 on 16/8/15.
 */
"use strict"
const jwt = require("jsonwebtoken"),
  configs = require("../configs/index"),
  utils = require('../utils/index'),
  mw = require('../middlewares/index.js');
const cert = configs.jwt.cert;
const User = require('../models/user.js');
module.exports.init = router => {
  router.post('/tokens',create);
  router.get('/tokens/check',mw.verify_token,check);
}

function* create(next){
  const username = this.request.body.username,
    password = this.request.body.password;
  let user = yield User.findOne({
    username,
  }).exec();
  if(user !== null){
    if(user.password === password){
      const token = jwt.sign({
        uid:user._id,
        name:user.name,
        exp:Math.floor(Date.now()/1000) + 24 * 60 * 60//1 hours
      },cert);
      utils.print(token);
      this.status = 200;
      this.body = {
        success:true,
        data:{
          uid:user._id,
          name:user.name,
          token,
        }
      }
    }else{
      this.throw(401,'密码错误')
    }
  }else{
    this.throw(401,'用户名错误');
  }
}
function* check(next){
  this.status = 200;
  this.body = {
    success:true,
    message:'验证通过'
  }
}
