<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="post-list-column">
      <h3 class="post-list-title"><i class="icon-wenzhang iconfont"></i> 文章列表  <i class="iconfont icon-jiahao post-add"></i></h3>
      <ul class="post-list">
        <li class="post-list-item" v-for="post in postList">
          <article class="post-thumb">
            <h3 class="post-title"><a href="">{{post['title']}}</a></h3>
            <h6 class="post-time">{{post['lastEditTime']}}</h6>
            <p class="post-content">
              {{post['excerpt']}}
            </p>
          </article>
        </li>
      </ul>
    </section>
    <div class="post-edit">
      <editor></editor>
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
    float right
    margin-right 10px
    margin-top 2px
  .post-list-title
    color $light
    padding-left 25px
    font-weight 400
  .post-edit
    overflow auto
    height 100%
  .post-list
    border-top 1px solid $border
    list-style none
    padding 0
  .post-list-item
    padding 10px 25px
    border-bottom 1px solid $border
  .post-thumb
    .post-title
      font-size 16px
      line-height 1.3
      font-weight 400
      margin 0 0 4px
      padding-bottom 0
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    .post-content
      color $light
      font-size 12px
      font-weight 400
      line-height 17px
      margin 0
    .post-time
      color $light
      margin 0 0 6px
  .post-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis


</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import Editor from '../Common/Editor.vue'
  import service from '../../services/posts/index'
  export default{
    data(){
      return{
        postList:[]
      }
    },
    route:{
      data(){
        return service.getDraftList().then((res)=>{
          if(res.success){
            return {postList:res.data};
          }else{
            return Promise.reject();
          }
        }).catch(err=>{
          alert('网络错误');
        })
      }
    },
    components:{
      NavAside,
      Editor
    }
  }
</script>
