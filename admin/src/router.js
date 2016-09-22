/**
 * Created by chuck7 on 16/9/8.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'

import store from './vuex/store'

Vue.use(VueRouter)
const router = new VueRouter();
router.map({
  '/login':{
    component:LoginView,
    authPage:true
  },
  '/posts':{
    component:PostsView
  },
  '/tags':{
    component: function (resolve) {
      require(['components/Tags/Tags.vue'], resolve)
    },
  },
  '/me':{
    component: function (resolve) {
      require(['components/Me/Me.vue'], resolve)
    },
  }
})
router.redirect({
  '*': '/posts'
})
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
export {
  router
}
