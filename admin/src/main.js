/**
 * Created by chuck7 on 16/9/8.
 */
import "./stylus/index.styl"
import Vue from "vue";
import VueRouter from "vue-router";
import MessageBox from 'vue-msgbox'
import adminComponent from "./Admin.vue"
import routerMap from "./routes.js"
import md2Text from './filters/md2Text'
import store from './vuex/store'
require('font-awesome/css/font-awesome.min.css')

window.HOST = {
  api: 'http://localhost:3000/'
}
window.alert = MessageBox

Vue.filter('md2Text', md2Text);

Vue.use(VueRouter)
var router = new VueRouter();
routerMap(router)
router.beforeEach(function({from,to,next,redirect}){
  //console.log(store.state.token.token)
  if(true !== to.authPage){
    if(null === store.state.token.token) {
      redirect('login');
    }else{
      next();
    }
  }else{
    //login页
    if(null === store.state.token.token) {
      next();
    }else{
      if(undefined !== from.path){
        redirect(from.path);
      }else{
        redirect('posts');
      }
    }
  }
})
window.alert = MessageBox

router.start(adminComponent, '#app')
export {
  router
}
