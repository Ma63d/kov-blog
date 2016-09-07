<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="post">
      <header>
        <h1>这是一个标题</h1>
        <h4>
          2016/09/06 10:28
        </h4>
      </header>
      <p>
        After 300+ commits, 8 alphas, 4 betas and 2 release candidates, today I am very proud to announce the release of
        After 300+ commits, 8 alphas, 4 betas and 2 release candidates, today I am very proud to announce the release of
      </p>
      <div class="fix">
        <span class="tag"><a href="" class="tag-link active">javascript</a></span><span class="tag"><a href="" class="tag-link active">javascript</a></span>
      </div>
    </article>
    <pagination next-link="'/blog/list'" :prev="false" :next-word="'第二篇文章'"></pagination>
  </div>
</template>
<style lang="stylus">
  @import "../stylus/_settings.styl"
  .tag
    float left
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
</style>
<script>
  import Pagination from './common/Pagination.vue'
  export default {
    components:{
      Pagination
    },
    data () {
      return {
      }
    }
  }
</script>
