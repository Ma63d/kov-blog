<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="null === tagActive"><i class="icon-biaoqian iconfont"></i> 根据标签搜索文章</h3>
      <ul class="clearfix reset-list tag-list" v-if="null !== tagActive">
        <li class="tag active"><span v-show="!tagActive['editing']">{{tagActive['name']}}</span> <i class="icon-chacha iconfont" v-show="!tagActive['editing']" @click="blurTag()"></i> <i class="icon-edit iconfont" @click="modifyTag(tagActive)" v-show="!tagActive['editing']"></i> <i class="icon-shanchu iconfont" style="vertical-align: 1px;" @click="deleteTag(tagActive)" v-show="!tagActive['editing']"></i> <input type="text" class="tag-input" v-if="tagActive['editing']" v-model="tagActive['newName']" placeholder="使用回车键提交" @keyup.13="saveTag(tagActive)"></li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="tag in tags"  v-show="tag !== tagActive"> <span @click="searchTag(tag)" v-show="!tag['editing']">{{tag['name']}}</span> </li>
      </ul>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== currentPostId"></article-editor>
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
  import ArticleEditor from '../Common/ArticleEditor.vue'
  import PostList from '../Common/PostList.vue'
  import service from '../../services/tags/index'
  import {getAllPost} from '../../vuex/actions/post'
  import {currentPostId} from '../../vuex/getters/post'
  export default{
    components:{
      NavAside,
      ArticleEditor,
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
      },
      getters:{
        currentPostId
      }
    },
    route:{
      data(){
        service.getAllTags().then(res=>{
          if(res.success){
            for(let i of res.data){
              i.newName = '';
              i.editing = false;
            }
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
      },
      modifyTag(tag){
        tag.newName = tag.name
        tag.editing = true;
      },
      saveTag(tag){
        if(tag.newName === tag.name){
          tag.editing = false;
          return;
        }else if('' === tag.newName){
          tag.editing = false;
          return;
        }else{
          service.modifyTag(tag.id,tag.newName).then(res => {
            if(res.success){
              tag.name = tag.newName
              tag.editing = false;
            }else{
              alert('已有同名标签');
            }
          }).catch(err => {
            alert('网络错误,修改标签失败')
          })
        }
      },
      deleteTag(tag){
        service.deleteTag(tag.id).then(res => {
          if(res.success){
            if(this.tagActive === tag){
              this.getAllPost();
              this.tagActive = null;
            }
            this.tags.$remove(tag);
          }
        })
      },
      blurTag(){
        this.tagActive = null;
        this.getAllPost();
      }
    }
  }
</script>
