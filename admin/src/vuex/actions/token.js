/**
 * Created by chuck7 on 16/9/20.
 */
import * as types from '../mutation_types'
import service from '../../services/login/index'
import {router} from '../../router.js'
export function createToken(store, username,password){
  return service.createToken(username,password).then(res=>{
    if(res.success){
      store.dispatch(types.TOKEN_CREATE, res.data.token);
      this.$router.replace('posts');
    }
  });
}
export function deleteToken({ dispatch }){
  dispatch(types.TOKEN_DELETE);
  //之所以这样做是因为这个actions有的时候并不是在组件内调用,而是在拿到http请求时,也就是需要被自己封装的fetch函数给调用
  //所以这个时候,this并不能拿到vm
  router.go('login')
}
