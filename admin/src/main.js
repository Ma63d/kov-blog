/**
 * Created by chuck7 on 16/9/8.
 */
import './stylus/index.styl'
import Vue from 'vue'
import MessageBox from 'vue-msgbox'
import adminComponent from './Admin'
import {router} from './router'
import store from './vuex/store'
import md2Text from './filters/md2Text'

require('font-awesome/css/font-awesome.min.css')

window.alert = MessageBox

Vue.filter('md2Text', md2Text)
new Vue({
    store,
    router,
    ...adminComponent
}).$mount('app')
