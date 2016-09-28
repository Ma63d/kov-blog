<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="post">
      <header id="header">
        <h1>{{title}}</h1>
        <h4>
          {{createTime}}
        </h4>
      </header>
      <p v-html="content | markdown">
      </p>
      <div class="fix tag-list" style="margin: 20px 0;">
        <span class="tag" v-for="tag in tags"><a v-link="'/tags'" class="tag-link active">{{tag.name}}</a></span>
      </div>
      <!-- 多说评论框 start -->
      <article id="duoshuo-comment" v-duoshuo="duoshuoOption">
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
        &:hover
          color $green
          border-bottom 2px solid $green
        &.active
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
  import service from '../services/post/index'
  import cursor from '../directives/vue-duoshuo'
  export default {
    components:{
      Pagination
    },
    data () {
      return {
        'id':'',
        'title': '',
        'createTime': '',
        'excerpt': '',
        'content': '',
        'lastEditTime': null,
        'tags': [],
        'visits': 0,
        'nextArticle':null,
        'prevArticle':null,
        'duoshuoOption':{}
      }
    },
    route:{
      data({to}){
        return service.getPost(to.params.postId).then(res=>{
          if(res.success === true ){
            if(null !== res.data){
              delete res.data._id;
              let duoshuoOption = {
                id:res.data.id,
                title:res.data.title
              }
              this.duoshuoOption = duoshuoOption
              return res.data
            }else{
              this.title = '404 not found';
              this.createTime = '';
              this.excerpt = '';
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
    }
  }
</script>
