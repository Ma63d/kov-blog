/**
 * Created by chuck7 on 16/9/8.
 */
import LoginView from 'components/login/login.vue'
export default (router)=>{
  router.map({
    '/login':{
      component:LoginView
    }
  })
  router.redirect({
    '*': '/login'
  })
}
