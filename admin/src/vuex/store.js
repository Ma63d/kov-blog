/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
//import createLogger from 'vuex/logger'
// 今天更新了一下node_modules
// 结果发现从cnpm上安装的vuex 删除了logger.js文件,增加了用typescript写的logger.d.ts,
// 所以此处删除了对这个logger的使用
import modules from './modules'
Vue.use(Vuex)
Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
