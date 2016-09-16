/**
 * Created by chuck7 on 16/9/8.
 */
import "./stylus/index.styl"
import Vue from "vue";
import VueRouter from "vue-router";
import adminComponent from "./Admin.vue"
import routerMap from "./routes.js"
import md2Text from './filters/md2Text'

require('font-awesome/css/font-awesome.min.css')

window.HOST = {
  api: 'http://localhost:3000/'
}


Vue.filter('md2Text', md2Text);

Vue.use(VueRouter)
var router = new VueRouter();
routerMap(router)
router.beforeEach(function({from,to,next,redirect}){
  if(true !== to.authPage){
    if(null === sessionStorage.getItem('token')) {
      redirect('login');
    }else{
      next();
    }
  }else{
    //login页
    if(null === sessionStorage.getItem('token')) {
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


router.start(adminComponent, '#app')
