/**
 * Created by chuck7 on 16/9/8.
 */
import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'
export default (router)=>{
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
    }
  })
  router.redirect({
    '*': '/posts'
  })
}
