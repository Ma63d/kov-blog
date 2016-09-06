/**
 * Created by chuck7 on 16/8/22.
 */
import Hello from 'components/Hello.vue'

export default (router)=>{
  router.map({
    '/hello':{
      component: Hello
    }
  })
  router.redirect({
    '*': '/hello'
  })
}
