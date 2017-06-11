/**
 * Created by chuck7 on 16/9/8.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from 'components/Login/Login'
import PostsView from 'components/Posts/Posts'

import store from './vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
        // {
        //     path: '/posts',
        //     name: 'posts',
        //     component: PostsView
        // },
        // {
        //     path: '/tags',
        //     name: 'tags',
        //     component: function (resolve) {
        //         import('components/Tags/Tags.vue').then(resolve)
        //     }
        // },
        // {
        //     path: '/me',
        //     name: 'me',
        //     component: function (resolve) {
        //         import('components/Me/Me.vue').then(resolve)
        //     }
        // }
    ]
})
router.beforeEach(function (to, from, next) {
    // console.log(store.state.token.token)
    if (to.authPage !== true) {
        if (store.state.token.token === null) {
            next({
                path: '/login',
                replace: true
            })
        } else {
            next()
        }
    } else {
        // login页
        if (store.state.token.token === null) {
            next()
        } else {
            if (undefined !== from.path) {
                next({
                    path: from.path,
                    replace: true
                })
            } else {
                next({
                    path: '/posts',
                    replace: true
                })
            }
        }
    }
})
export {
  router
}
