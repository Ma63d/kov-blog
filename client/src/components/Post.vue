<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="post">
      <header>
        <h1>{{title}}</h1>
        <h4>
          {{createTime}}
        </h4>
      </header>
      <p v-html="content | markdown">
      </p>
      <div class="fix">
        <span class="tag" v-for="tag in tags"><a href="" class="tag-link active">{{tag.name}}</a></span>
      </div>
    </article>
    <pagination :next="nextArticle !== null" :next-link="nextArticle?'/posts/'+nextArticle._id:''" :next-word="nextArticle&&nextArticle.title" :prev="prevArticle !== null" :prev-link="prevArticle?'/posts/'+prevArticle._id:''" :prev-word="prevArticle&&prevArticle.title" ></pagination>
  </div>
</template>
<style lang="stylus">
  @import "../stylus/_settings.styl"

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
    &+&
      margin-left 20px
  @media screen and (max-width: 720px)
    .tag
      margin: 0 5px 5px;
      &+&
        margin-left 5px
</style>
<script>
  import Pagination from './common/Pagination.vue'
  import service from '../services/post/index'
  export default {
    components:{
      Pagination
    },
    data () {
      return {
        'id':'',
        'title': '',
        'author': '',
        'createTime': '',
        'excerpt': '',
        'content': '',
        'lastEditTime': null,
        'tags': [],
        'visits': 0,
        'nextArticle':null,
        'prevArticle':null
      }
    },
    route:{
      data({to}){
        return service.getPost(to.params.postId).then(res=>{
          if(res.success === true){
            res.data.id = res.data._id;
            delete res.data._id;
            return res.data;
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      }
    }
  }
</script>
