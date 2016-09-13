<template>
  <aside class="sidebar">
    <img class="sidebar-logo" src="../../assets/img/logo.png" alt="logo">
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><button type="button" class="aside-nav-button"><i class="icon-wenzhang iconfont"></i></button>  </li>
        <!--<li class="aside-nav-item"><i class="icon-biaoqian iconfont"></i> </li>-->
      </ul>
    </nav>
    <nav class="aside-menu">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><button type="button" class="aside-nav-button"><i class="icon-ordinaryset iconfont"></i></button></li>
        <li class="aside-nav-item"><button type="button" class="aside-nav-button"><i class="icon-icon11 iconfont"></i> </button></li>
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
    width 45px
    height 45px
    background #fff
    padding 0
    padding-top 1px
    border 1px solid $border
    border-radius 50%
    color $green
    .iconfont
      font-size 22px
  .aside-menu
    position absolute
    width 100%
    left 0
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
