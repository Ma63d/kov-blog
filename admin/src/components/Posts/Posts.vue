<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="post-list-title"><i class="icon-wenzhang iconfont"></i> 文章列表  <i class="iconfont icon-jiahao post-add"></i></h3>
      <ul class="post-list">
        <li class="post-list-item">
          <article class="post-thumb">
            <h3><a href="">第一篇博客</a></h3>
            <p class="post-thumb-content">
              内容大法师内容大法师内容大法师内容大法师
            </p>
            <h6>2016/09/10 16:00</h6>
          </article>
        </li>
        <li class="post-list-item">
          <article class="post-thumb">
            <h3><a href="">第一篇博客</a></h3>
            <p class="post-thumb-content">
              内容大法师内容大法师内容大法师内容大法师
            </p>
            <h6>2016/09/10 16:00:30</h6>
          </article>
        </li>
      </ul>
    </section>
    <div class="post-edit">
      <textarea id="editor"></textarea>
    </div>
  </div>
</template>
<style lang="stylus">
  @import '~simplemde/dist/simplemde.min.css'
  @import '../../stylus/_settings.styl'
  $border = 1px solid #aaa
  .container-with-aside
    margin-left 45px
    height 100%
  .post-list-column
    float left
    border-right $border
    height 100%
    width 200px
  .post-add
    float right
    margin-right 10px
    margin-top 2px
  .post-list-title
    padding-left 10px
    font-weight 400
  .post-edit
    overflow auto
    height 100%
  .post-list
    border-top $border
  .post-list-item
    padding 5px 10px
    border-bottom $border
  .post-thumb
    h3
      margin .8em 0
      padding-bottom 0
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    h6
      color $light
      margin 0
  .post-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .CodeMirror-sided
    box-sizing border-box
  .editor-preview,
  .editor-preview-side
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
      margin 0 0 .5em
    h2
      margin .8em 0
      padding-bottom 0
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
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
    h4
      color $light
      margin 1.2em 0
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
    figure, p
      margin-left 0


</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import SimpleMDE from 'simplemde/dist/simplemde.min.js'
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    },
    route:{
      data(){
        this.$nextTick(()=>{

          new SimpleMDE({ element: document.getElementById('editor') })

        })
      }
    },
    components:{
      NavAside
    }
  }
</script>
