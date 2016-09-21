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
      <div class="fix" style="margin: 20px 0;">
        <span class="tag" v-for="tag in tags"><a href="" class="tag-link active">{{tag.name}}</a></span>
      </div>
      <!-- 多说评论框 start -->
      <article id="duoshuo-comment">
      </article>
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
          if(res.success === true ){
            if(null !== res.data){
              delete res.data._id;
              /**
               * this.$nextTick 并不能保证dom修改已经完成..
               * https://github.com/vuejs/vue-router/issues/289
               * 尤大大:"nextTick is intended to be used right after you modified some reactive data."
               * 至今也没有找到方法来保证组件的数据都拿到且渲染到页面中了之后再执行某个函数
               * attached和ready钩子的话也都有一些问题,
               * 一方面是开启了keep-alive后,ready只执行一次,而且这个时候data里的ajax还没取回数据
               * 另一方面是attached钩子的话,问题更夸张,当我直接打开当前页面(文章详情页)的话,是attached->ready->data get这样的顺序
               * 但是如果我一开始进的页面不是这个页面,比如是文章列表页,当我来到这个页面(文章详情页)时,是data get->attached这样的顺序,attached又跑后面去了
               * 尼玛...我真真是日了狗了
               * 一坑未平,一坑又起
               * 所以这段代码写得真tm丑 fixme!
               * */
              this.$nextTick(()=>{
                let el = document.getElementById('duoshuo-comment');
                if(el&&el.childNodes.length){
                  el.innerHTML = ``
                }
                setTimeout(()=>{
                  el = document.getElementById('duoshuo-comment');
                  if(el&&el.childNodes.length){
                    el.innerHTML = ``
                  }
                  window.duoshuoQuery.sso = {login : '#!/posts/'+this.id,logout:process.env.index+'#!/posts/'+this.id};
                  let dom = document.createElement('div');
                  if(el){
                    dom.setAttribute('data-thread-key',this.id);
                    dom.setAttribute('data-title',this.title);
                    dom.setAttribute('data-url',process.env.index+'#!/posts/'+this.id);
                    DUOSHUO.EmbedThread(dom);
                    el.appendChild(dom);
                  }
                },300);
              })
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
      }
    },
  }
</script>
