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
  @import '../../stylus/simplemde.styl'
  @import '../../stylus/_settings.styl'
  .container-with-aside
    margin-left 70px
    height 100%
  .post-list-column
    float left
    border-right 1px solid $border
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
    border-top 1px solid $border
    list-style none
    padding 0
  .post-list-item
    padding 5px 10px
    border-bottom 1px solid $border
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
    background white
    padding: 0.2em 1.4em 0;
    font-family $body-font
    font-size $body-font-size
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color $medium

    a
      text-decoration none
      color $medium

    :focus
      outline 0

    img
      border none

    h1, h2, h3, h4, strong
      font-weight 600
      color $dark

    code, pre
      font-family $code-font
      font-size $code-font-size
      background-color $codebg
      -webkit-font-smoothing initial
      -moz-osx-font-smoothing initial

    code
      color #e96900
      padding 3px 5px
      margin 0 2px
      border-radius 2px
      white-space nowrap

    em
      color $light

    p
      word-spacing 0.05em

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
    pre
      overflow-x auto
      position relative
      background-color $codebg
      padding .8em .8em .4em
      line-height 1.1em
      border-radius $radius
      code
        display block
        padding 1.2em 1.4em
        line-height 1.5em
        margin 0
        color #525252
        border-radius 0
        white-space pre
        &.lang-html, &.lang-javascript, &.lang-bash, &.lang-css
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
        &.lang-html code:after
          content 'HTML'
        &.lang-javascript:after
          content 'JS'
        &.lang-bash:after
          content 'Shell'
        &.lang-css:after
          content 'CSS'


</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import SimpleMDE from 'simplemde/dist/simplemde.min.js'
  import marked from 'marked';
  const languages = ['1c','abnf','accesslog','actionscript','ada','apache','applescript','cpp','arduino','armasm','xml','asciidoc','aspectj','autohotkey','autoit','avrasm','awk','axapta','bash','basic','bnf','brainfuck','cal','capnproto','ceylon','clojure','clojure-repl','cmake','coffeescript','coq','cos','crmsh','crystal','cs','csp','css','d','markdown','dart','delphi','diff','django','dns','dockerfile','dos','dsconfig','dts','dust','ebnf','elixir','elm','ruby','erb','erlang-repl','erlang','excel','fix','fortran','fsharp','gams','gauss','gcode','gherkin','glsl','go','golo','gradle','groovy','haml','handlebars','haskell','haxe','hsp','htmlbars','http','inform7','ini','irpf90','java','javascript','json','julia','kotlin','lasso','ldif','less','lisp','livecodeserver','livescript','lsl','lua','makefile','mathematica','matlab','maxima','mel','mercury','mipsasm','mizar','perl','mojolicious','monkey','moonscript','nginx','nimrod','nix','nsis','objectivec','ocaml','openscad','oxygene','parser3','pf','php','pony','powershell','processing','profile','prolog','protobuf','puppet','purebasic','python','q','qml','r','rib','roboconf','rsl','ruleslanguage','rust','scala','scheme','scilab','scss','smali','smalltalk','sml','sqf','sql','stan','stata','step21','stylus','subunit','swift','taggerscript','yaml','tap','tcl','tex','thrift','tp','twig','typescript','vala','vbnet','vbscript','vbscript-html','verilog','vhdl','vim','x86asm','xl','xquery','zephir'];
  import highlight from 'highlight.js'
  highlight.configure({
    classPrefix: ''     // don't append class prefix
  })
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function (code,lang) {
      if(!~languages.indexOf(lang)){
        return highlight.highlightAuto(code).value;
      }
      return highlight.highlight(lang,code).value;
    }
  });
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    },
    route:{
      data(){
        this.$nextTick(()=>{

          new SimpleMDE({
            autoDownloadFontAwesome:false,
            element: document.getElementById('editor'),
            previewRender: function(plainText) {
              return marked(plainText); // Returns HTML from a custom parser
            },
          })

        })
      }
    },
    components:{
      NavAside
    }
  }
</script>
