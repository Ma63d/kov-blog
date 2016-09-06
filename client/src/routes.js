/**
 * Created by chuck7 on 16/8/22.
 */
import List from 'components/PostList.vue'
import Post from 'components/Post.vue'
export default (router)=>{
  router.map({
    '/post/list':{
      component: List
    },
    '/post/:postId':{
      component: Post
    }
  })
  router.redirect({
    '*': '/post/list'
  })
}
