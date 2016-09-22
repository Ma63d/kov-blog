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

//请修改config文件中的duoshuoShortName为你自己的多说二级域名
//http://dev.duoshuo.com/docs/50b344447f32d30066000147
window.duoshuoQuery = {short_name:process.env.duoshuoShortName};
(function() {
  var ds = document.createElement('script');
  ds.type = 'text/javascript';ds.async = true;
  ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
  ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0]
  || document.getElementsByTagName('body')[0]).appendChild(ds);
})();
