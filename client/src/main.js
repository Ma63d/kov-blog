import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Blog from './Blog'
import {markdown} from './filters/index'
import './stylus/index.styl'

Vue.use(Router)
Vue.filter('markdown', markdown);

const router = new Router()
routes(router)
router.start(Blog, 'blog')




