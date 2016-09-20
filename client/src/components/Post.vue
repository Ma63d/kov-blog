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
      <div class="fix">
        <span class="tag" v-for="tag in tags"><a href="" class="tag-link active">{{tag.name}}</a></span>
      </div>
      <!-- 多说评论框 start -->
      <div id="duoshuo-comment">

      </div>
      <!-- 多说评论框 end -->

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
        this.id = to.params.postId;
        return service.getPost(to.params.postId).then(res=>{
          if(res.success === true){
            console.log('data get');
            delete res.data._id;
            return res.data
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      }
    },
    ready(){
      console.log('ready');
    },
    attached(){
      console.log('attached');
      this.$nextTick(()=>{
        console.log(this.id+1)
        //此时,特别奇怪,dom上还是没有把数据绑定上,还是手工绑定吧
        let el = document.getElementById('duoshuo-comment'),
          dom = document.createElement('div');
        dom.setAttribute('data-thread-key',this.id);
        dom.setAttribute('data-title',this.title);
        dom.setAttribute('data-url','chuckliu.me/posts/'+this.id);
        DUOSHUO.EmbedThread(dom);
        el.appendChild(dom);
      })
    }
  }
</script>
