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
      Copyrights滚粗. 自豪的采用Chuck纯手工搭建的<a href="https://github.com/Ma63d/kov-blog" target="_blank">博客</a>.
    </footer>
  </div>
</template>

<script>
  import HeaderNav from 'components/common/HeaderNav.vue'
  export default {
    components:{
      HeaderNav
    },
    ready(){
      //请修改config文件中的duoshuoShortName为你自己的多说二级域名
      //http://dev.duoshuo.com/docs/50b344447f32d30066000147
      window.duoshuoQuery = {short_name:process.env.duoshuoShortName};
      (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
        || document.getElementsByTagName('body')[0]).appendChild(ds);
      })();
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
  p
    word-spacing 0.05em
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
  pre
    position relative
    background-color $codebg
    padding .8em .8em .4em
    line-height 1.1em
    border-radius $radius
    code
      overflow-x auto
      display block
      padding 1.2em 1.4em
      line-height 1.5em
      margin 0
      color #525252
      border-radius 0
      white-space pre
      &.lang-html, &.lang-js, &.lang-bash, &.lang-css
        &:after
          position absolute
          top 0
          right 0
          color #ccc
          text-align right
          font-size .75em
          padding 5px 10px 0
          line-height 15px
          height 15px
          font-weight 600
      &.lang-html:after
        content 'HTML'
      &.lang-js:after
        content 'JS'
      &.lang-bash:after
        content 'Shell'
      &.lang-css:after
        content 'CSS'
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
  .post-list
    padding 1em 0 2em
    border-bottom 1px solid $border
  .post
    padding 1em 0 2em
    border-bottom 1px solid $border
    h2
      margin 2em 0 0.8em;
      padding-bottom 0.7em
      border-bottom 1px solid #ddd

.copyright
  color $light
  font-size 1em
  text-align center
  padding 0 20px 30px
  margin-top 30px
</style>
