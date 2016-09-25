<template>
  <div class="post-list">
    <!--这个div用来避免这个组件成为片段实例-->
    <article v-for="post in posts">
      <header>
        <h2><a v-link="'/posts/'+post['_id']">{{post['title']}}</a></h2>
        <h4>
          {{post['createTime']}}
        </h4>
      </header>

      <p v-html="post['excerpt'] | markdown">

      </p>

      <footer>
        <a v-link="'/posts/'+post['_id']">... continue reading</a>
      </footer>

    </article>
    <div class="guide-links fix">
      <span v-if="curPage > 1">← <a href="javascript:;" @click="prevPage()">上一页</a></span>
      <span class="r" v-if="totalPage && (curPage < totalPage)"><a href="javascript:;" @click="nextPage()">下一页</a> →</span>
    </div>
  </div>

</template>
<script>
  import Pagination from './common/Pagination.vue'
  import service from '../services/postlist/index'
  import {getParameterByName} from '../lib/utils'
  const limit = 10;
  export default {
    components:{
      Pagination
    },
    data () {
      return {
        posts:[],
        totalPage:0,
        curPage:1
      }
    },
    route:{
      data(){
        service.getPostList({page:this.curPage,limit}).then(res=>{
          if(res.success === true){
            this.posts = res.data.articles;
            this.totalPage = Math.ceil(res.data.total/limit);
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      }
    },
    methods:{
      prevPage(){
        service.getPostList({page:this.curPage-1,limit}).then(res=>{
          this.curPage--
          if(res.success === true){
            this.posts = res.data.articles;
            this.totalPage = Math.ceil(res.data.total/limit);
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      },
      nextPage(){
        service.getPostList({page:this.curPage+1,limit}).then(res=>{
          this.curPage++
          if(res.success === true){
            this.posts = res.data.articles;
            this.totalPage = Math.ceil(res.data.total/limit);
          }
        }).catch(err=>{
          alert('网络错误,请刷新重试');
        })
      }
    }
  }
</script>

