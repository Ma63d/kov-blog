<template>
  <div>
    <!--这个div用来避免这个组件成为片段实例-->
    <article class="post">
      <header>
        <h2><a v-link="'/post/1'">这是一个标题</a></h2>
        <h4>
          2016/09/06 10:28
        </h4>
      </header>

      <blockquote>
        <p>
          After 300+ commits, 8 alphas, 4 betas and 2 release candidates, today I am very proud to announce the release of
          After 300+ commits, 8 alphas, 4 betas and 2 release candidates, today I am very proud to announce the release of
        </p>
      </blockquote>

      <footer>
        <a href="">... continue reading</a>
      </footer>

    </article>
    <pagination next-link="'/post/list'" :prev="false"></pagination>
  </div>

</template>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
