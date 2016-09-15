/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import modules from './modules'
Vue.use(Vuex)
Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
