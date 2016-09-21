<template>
  <header class="top-nav-container">
    <nav class="top-nav">
      <a href="javascript:;" class="vertical-center nav-logo">
        <img src="../../assets/img/logo.png" class="logo vertical-center-content" alt="">
        <span class="brand vertical-center-content">Chuck Liu</span>
      </a>
      <ul class="nav-link-container">
        <li class="nav-link-item"><a class="nav-link" v-link="{ path: '/posts', activeClass: 'active' }" >文章</a></li>
        <li class="nav-link-item"><a class="nav-link" v-link="{ path: '/tags', activeClass: 'active' }">标签</a></li>
        <li class="nav-link-item"><a class="nav-link" v-link="{ path: '/me', activeClass: 'active' }">关于我</a></li>
      </ul>
    </nav>
  </header>
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  $header-height = 40px
  .top-nav-container
    box-shadow 0 0 4px rgba(0,0,0,0.25)
  .top-nav
    max-width  850px
    margin 0 auto
    height $header-height
    padding 25px 0
  .nav-logo
    display inline-block
    .logo
      margin-right 6px
  .logo
    width 40px
    height 40px
  .brand
    font-size 1.5em
    color $dark
    font-family $logo-font
    font-weight 500
  /**
    fixme! 留作以后的slogan样式
  */
  /*.slogan
    font-size 1.3em
    color $light
    font-family $logo-font
    font-weight 500*/
  .nav-link-container
    float right
    list-style-type none
    margin 0
    padding 0
  .nav-link-item
    display inline-block
    margin 0 .6em
  .nav-link
    height $header-height
    line-height $header-height
    text-decoration none
    color $medium
    padding-bottom 3px
    &:hover, &.active
        border-bottom 3px solid $green
</style>
<script>
  export default{

  }
</script>
