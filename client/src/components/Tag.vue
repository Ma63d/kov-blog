<template>
  <div class="post-list">
    <section>
      <h2>
        All Tags
      </h2>
      <p class="fix tag-container tag-list">
        <span class="tag" v-for="tag in tags"><a href="javascript:;" @click="focus(tag['id'])">{{tag['name']}}</a></span>
      </p>
    </section>
    <section v-for="item in tagAndItsArticles" :id="item['id']">
      <h3>
        {{item['name']}}
      </h3>
      <ul>
        <li v-for="article in item['articles']">
          <h4><a v-link="'/posts/'+article['id']">{{article['title']}}</a> <span>{{article['createTime']}}</span></h4>
        </li>
      </ul>
    </section>
  </div>
</template>
<style lang="stylus">
  .tag-container
    font-size 1.2em
</style>
<script>
  import service from '../services/tag/index'
  export default{
    data(){
      return {
        tagAndItsArticles:[],
        tags:[]
      }
    },
    route:{
      data(){
        this.tags = [];
        this.tagAndItsArticles = [];
        service.getAllTags().then(res => {
          if(res.success){
            res.data.map(tag => {
              service.getPostListWithTag(tag.id).then(resp=>{
                if(resp.success){
                  if(resp.data.length){
                    tag.articles = resp.data
                    this.tags.push({name:tag.name,id:tag.id});
                    this.tagAndItsArticles.push(tag);
                  }
                }
              })
            })
          }
        })
      }
    },
    methods:{
      focus(id){
        let dom = document.getElementById(id);
        window.scrollTo(0,dom.offsetTop);
      }
    }
  }
</script>
