<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-wenzhang iconfont"></i> 文章列表  <i class="iconfont icon-jiahao post-add" @click="createPost"></i></h3>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== currentPostId"></article-editor>
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
    width 300px
  .post-add
    cursor pointer
    float right
    margin-right 10px
    margin-top 2px
  .page-title
    color $light
    padding-left 25px
    font-weight 400
  .post-edit
    overflow auto
    height 100%

</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import ArticleEditor from '../Common/ArticleEditor.vue'
  import PostList from '../Common/PostList.vue'
  import service from '../../services/posts/index'
  import {getAllPost,createPost} from '../../vuex/actions/post'
  import {postSaved,postTitleSaved,currentPostId} from '../../vuex/getters/post'
  export default{
    data(){
      return{
      }
    },
    route:{
      data(){
        this.getAllPost();
      }
    },
    components:{
      NavAside,
      ArticleEditor,
      PostList
    },
    vuex: {
      getters: {
        postSaved,
        postTitleSaved,
        currentPostId
      },
      actions:{
        getAllPost,
        createPost
      }
    },
    methods:{
      newPost(){
        if(!this.postSaved || !this.postTitleSaved){
          alert('当前文章正在保存中,请稍后重试');
        }else{
          this.createPost();
        }
      }
    }
  }
</script>
