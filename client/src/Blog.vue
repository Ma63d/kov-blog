<template>
  <div id="app">
    <header-nav></header-nav>
    <main class="content blog">
      <router-view
        keep-alive
        transition="fade"
        transition-mode="out-in">
      </router-view>
    </main>
    <footer class="copyright">
      Copyrights滚粗. 自豪的采用Chuck纯手工搭建的博客.
    </footer>
  </div>
</template>

<script>
  import HeaderNav from 'components/common/HeaderNav.vue'
  export default {
    components:{
      HeaderNav
    }
  }
</script>

<style lang="stylus">
@import "./stylus/_settings.styl"
.fade-transition
  transition: opacity .2s ease
.fade-enter, .fade-leave
  opacity: 0;
.content
  max-width  850px
  box-sizing border-box
  margin 0 auto
  padding: 0.2em 1.4em 0;
  img
    max-width 100%
  span.light
    color $light
  span.info
    font-size .85em
    display inline-block
    vertical-align middle
    width 280px
    margin-left 20px
  h1
    margin 0 0 1em
  h2
    margin 2em 0 .8em
    padding-bottom .7em
    border-bottom 1px solid $border
  h3
    margin 3em 0 1.2em
    position relative
    &:before
      content "#"
      color $green
      position absolute
      left -0.7em
      top -2px
      font-size 1.2em
      font-weight bold
  figure, p, ul, ol
    margin 1.2em 0
  p, ul, ol
    line-height 1.6em
  ul, ol
    padding-left 1.5em
  a
    color $green
    font-weight 600
  blockquote
    margin 2em 0
    padding-left 20px
    border-left 4px solid $green
    p
      font-weight 600
      margin-left 0
  iframe
    margin 1em 0
  p.tip
    padding 12px 24px 12px 30px
    margin 2em 0
    border-left 4px solid $red
    background-color $codebg
    position relative
    border-bottom-right-radius $radius
    border-top-right-radius $radius
    &:before
      position absolute
      top 14px
      left -12px
      background-color $red
      color #fff
      content "!"
      width 20px
      height 20px
      border-radius 100%
      text-align center
      line-height 20px
      font-weight bold
      font-family $logo-font
      font-size 14px

.content.blog
  h1
    margin .8em 0
    font-size 2em
  h2
    margin .8em 0
    padding-bottom 0
    border-bottom none
    a
      color $dark
      &:hover
        border-bottom 2px solid $green
  h4
    color $light
    margin 1.2em 0
  figure, p
    margin-left 0
  .post
    padding 1em 0 2em
    border-bottom 1px solid $border

.copyright
  color $light
  font-size 1em
  text-align center
  padding 0 20px 10px
  margin-top 30px
</style>
