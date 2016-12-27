<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <catalog dom-id="markdown-content" v-if="contentLoaded && domExist"></catalog>
    <article class="post">
      <header id="header">
        <h1>{{title}}</h1>
        <h4>
          {{createTime}}
        </h4>
      </header>
      <p v-html="content | markdown" id="markdown-content">
      </p>
      <div class="fix tag-list" style="margin: 20px 0;">
        <span class="tag" v-for="tag in tags"><a v-link="'/tags'" class="tag-link active">{{tag.name}}</a></span>
      </div>
      <!-- 多说评论框 start -->
      <article id="duoshuo-comment" v-duoshuo="duoshuoOption" v-if="domExist && contentLoaded">
      </article>
      <!-- 多说评论框 end -->
    </article>
    <pagination :next="nextArticle !== null" :next-link="nextArticle?'/posts/'+nextArticle._id:''" :next-word="nextArticle&&nextArticle.title" :prev="prevArticle !== null" :prev-link="prevArticle?'/posts/'+prevArticle._id:''" :prev-word="prevArticle&&prevArticle.title" ></pagination>
  </div>
</template>
<style lang="stylus">
  @import "../stylus/_settings.styl"
  .tag-list
    .tag
      float left
      margin-bottom 5px
      a.tag-link
        color $light
        border-bottom 2px solid $light
        &:hover,&.active
          color $green
          border-bottom 2px solid $green
      &+.tag
        margin-left 20px
  @media screen and (max-width: 720px)
    .tag-list
      .tag
        margin: 0 5px 5px;
        &+.tag
          margin-left 5px
</style>
<script>
  import Pagination from './common/Pagination.vue'
  import Catalog from './common/Catalog.vue'
  import service from '../services/post/index'
  import cursor from '../directives/vue-duoshuo'
  // import {markdown} from '../filters/index.js'
  export default {
    components:{
      Pagination,
      Catalog
    },
    data () {
      return {
        'id':'',
        'title': '',
        'createTime': '',
        'content': '',
        'lastEditTime': null,
        'tags': [],
        'nextArticle':null,
        'prevArticle':null,
        'duoshuoOption':{},
        'domExist': false,
        'contentLoaded': false
      }
    },
    route:{
      data({to,from}){
        this.contentLoaded = false
        if(from.path === undefined) {
          // 如果是打开浏览器直接进入的这个路由
          this.domExist = true;
        } else {
          // 如果不是直接进入的
          // 需要判断一下是否是从/path/:id进入的,因为可能只是路由的id变化了而已
          // 并没有经历组件的切换过程, 并不需要等待transition的结束,直接就可以赋值domExist为true
          if( (/^\/posts\//).test(from.path) && (from.params.postId != undefined)) {
            this.domExist = true;
          } else {
            this.domExist = false;
          }
        }
        this.domExist = from.path === undefined || ((/^\/posts\//).test(from.path) && (to.params.postId));
        this.duoshuoOption = {}
        return service.getPost(to.params.postId).then(res=>{
          if(res.success === true ){
            if(null !== res.data){
              this.id = res.data._id
              this.title = res.data.title
              this.createTime = res.data.createTime
              this.content = res.data.content
              this.nextArticle = res.data.nextArticle
              this.prevArticle = res.data.prevArticle
              this.lastEditTime = res.data.lastEditTime
              this.tags = res.data.tags
              let duoshuoOption = {
                id:res.data.id,
                title:res.data.title
              }
              this.duoshuoOption = duoshuoOption
              this.contentLoaded = true
              return
            }else{
              this.title = '404 not found';
              this.createTime = '';
              this.content = '';
              this.lastEditTime = null;
              this.tags = [];
              this.visits = 0;
              this.nextArticle = null;
              this.prevArticle = null;
            }
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      },
    },
    events: {
      'enter': function() {
        this.domExist = true
      }
    }
  }
</script>
