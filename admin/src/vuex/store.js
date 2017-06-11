/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import actions from './actions'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules,
    actions,
    strict: debug
})
