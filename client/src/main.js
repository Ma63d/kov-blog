import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Blog from './Blog'

import './stylus/index.styl'

Vue.use(Router)

const router = new Router()
routes(router)
router.start(Blog, 'blog')
