/**
 * Created by chuck7 on 16/9/8.
 */
import "./stylus/index.styl"
import Vue from "vue";
import VueRouter from "vue-router";
import MessageBox from 'vue-msgbox'
import adminComponent from "./Admin.vue"
import {router} from "./router.js"

import md2Text from './filters/md2Text'

require('font-awesome/css/font-awesome.min.css')

/**
 * router的beforeEach操作之所以放在main里面,而不是把所有与router相关的都放在router.js里面
 * 是因为涉及到循环引用的问题,router引了store,store引了router,
 * 循环引用的话会出现的情况参见:http://es6.ruanyifeng.com/#docs/module#循环加载
 * 导致store在login组件拿到的是个空对象,所以就让router.js提前执行完毕,把router.beforeEach放这了.
 * */

window.alert = MessageBox

Vue.filter('md2Text', md2Text);

window.alert = MessageBox

router.start(adminComponent, '#app')

