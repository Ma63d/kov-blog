<template>
  <aside class="sidebar">
    <img class="sidebar-logo" src="../../assets/img/logo.png" alt="logo">
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/posts', activeClass: 'active' }"><i class="icon-wenzhang iconfont"></i></a>  </li>
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/tags', activeClass: 'active' }"><i class="icon-biaoqian iconfont"></i></a> </li>
        <li class="aside-nav-item"><a class="aside-nav-button" v-link="{ path: '/me', activeClass: 'active' }"><i class="icon-wo iconfont"></i></a> </li>
      </ul>
    </nav>
    <nav class="aside-menu">
      <ul class="aside-nav-list">
        <!--<li class="aside-nav-item"><a class="aside-nav-button"><i class="icon-ordinaryset iconfont"></i></a></li>-->
        <li class="aside-nav-item"><a class="aside-nav-button" @click="deleteToken()"><i class="icon-icon11 iconfont"></i> </a></li>
      </ul>
    </nav>
  </aside>
</template>
<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .sidebar
    box-sizing border-box
    border-right 1px solid $border
    background-color #f8f8f8
    text-align center
    color white
    position fixed
    height 100%
    width 70px
    padding 12px 12px 24px 12px
    left 0
    top 0
    .aside-nav
      margin-top 30px
  .sidebar-logo
    margin-top 5px
    width 36px
  .aside-nav
    border-top 1px solid $border
  .aside-nav-list
    list-style none
    padding 0
  .aside-nav-item
    padding 20px 0
  .aside-nav-button
    cursor pointer
    display inline-block
    box-sizing border-box
    width 45px
    height 45px
    background #fff
    padding 0
    padding-top 10px
    border 1px solid $border
    border-radius 50%
    color $green
    &.active
      border 1px solid $green
    &:hover
      color white
      background $green
      border 1px solid $green
    .iconfont
      font-size 22px
  .aside-menu
    position absolute
    width 100%
    left 0
    bottom 0
</style>
<script>
  import {deleteToken} from '../../vuex/actions/token'
  export default{
    vuex:{
      actions:{
        deleteToken
      }
    }
  }
</script>
