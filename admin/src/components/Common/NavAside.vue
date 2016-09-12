<template>
  <aside class="sidebar">
    <img class="sidebar-logo" src="../../assets/img/logo.png" alt="logo">
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><i class="icon-wenzhang iconfont"></i> </li>
        <li class="aside-nav-item"><i class="icon-biaoqian iconfont"></i> </li>
      </ul>
    </nav>
    <nav class="aside-menu">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><i class="icon-ordinaryset iconfont"></i> </li>
        <li class="aside-nav-item"><i class="icon-icon11 iconfont"></i> </li>
      </ul>
    </nav>
  </aside>
</template>
<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .sidebar
    background $dark
    text-align center
    color white
    position fixed
    height 100%
    width 45px
    left 0
    top 0
    .aside-nav
      margin-top 30px
  .sidebar-logo
    margin-top 5px
    width 80%
  .aside-nav
    border-top 1px solid $medium
  .aside-nav-item
    padding 20px 0
  .aside-menu
    position absolute
    width 100%
    bottom 0
</style>
<script>
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    }
  }
</script>
