/**
 * Created by chuck7 on 16/9/8.
 */
import "./stylus/index.styl"
import Vue from "vue";
import VueRouter from "vue-router";
import adminComponent from "./Admin.vue"
import state from "./store/index.js"
import routerMap from "./routes.js"

window.HOST = {
  api: 'http://localhost:3000/'
}

Vue.use(VueRouter)
var router = new VueRouter();
routerMap(router)
router.beforeEach(function({from,to,next,redirect}){
  if(true !== to.authPage){
    if(undefined === state.token) {
      if(null !== (state.token = sessionStorage.getItem('token')) ){
        next();
      }else{
        redirect('login');
      }
    }else{
      if(null === state.token){
        redirect('login');
        return;
      }
      next()
    }
  }else{
    //login页
    if(undefined === state.token) {
      if(null !== (state.token = sessionStorage.getItem('token')) ){
        next();
      }else{
        redirect(from.path);
      }
    }else{
      if(null === state.token ){
        next();
        return;
      }
      redirect(from.path);
    }
  }
})


router.start(adminComponent, '#app')
