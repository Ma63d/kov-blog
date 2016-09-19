<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="post-list-title" style="margin-bottom:0" v-if="null === tagActive"><i class="icon-biaoqian iconfont"></i> 根据标签搜索文章</h3>
      <ul class="clearfix reset-list tag-list" v-if="null !== tagActive">
        <li class="tag active">{{tagActive['name']}}</li>
      </ul>
      <ul class="clearfix reset-list tag-list" >
        <li class="tag" v-for="tag in tags" @click="searchTag(tag)">{{tag['name']}}</li>
      </ul>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <editor v-if="null !== currentPostId"></editor>
    </div>
  </div>
</template>
<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import Editor from '../Common/Editor.vue'
  import PostList from '../Common/PostList.vue'
  import service from '../../services/tags/index'
  import {getAllPost} from '../../vuex/actions/post'
  export default{
    components:{
      NavAside,
      Editor,
      PostList
    },
    data(){
      return {
        tagActive:null,
        tags:[]
      }
    },
    vuex: {
      actions:{
        getAllPost
      }
    },
    route:{
      data(){
        service.getAllTags().then(res=>{
          if(res.success){
            this.tags =res.data
            this.getAllPost();
          }
        })
      }
    },
    methods:{
      searchTag(tag){
        this.tagActive = tag;
        this.getAllPost(tag.id);
      }
    }
  }
</script>
