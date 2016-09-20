<template>
  <div style="height:100%">
    <!--使用了keep-alive之后在Editor组件中时常出现意外的一次数据变动,watch函数执行两次的情况-->
    <!--所以还是放弃了keep-alive-->
    <router-view
      transition="fade"
      transition-mode="out-in">
    </router-view>
  </div>

</template>
<style lang="stylus">
  .fade-transition
    transition: opacity .2s ease
  .fade-enter, .fade-leave
    opacity: 0;
</style>
<script>
  import store from './vuex/store'
  import {deleteToken} from './vuex/actions/token'
  export default {
    store,
    vuex:{
      actions:{
        deleteToken
      }
    }
  }
</script>
