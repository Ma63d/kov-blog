<template>
  <div id="app">
    <header-nav></header-nav>
    <main>
      <router-view
        keep-alive
        transition
        transition-mode="out-in">
      </router-view>
    </main>
    <footer></footer>
  </div>
</template>

<script>
  import HeaderNav from 'components/common/HeaderNav.vue'
export default {
  components:{
    HeaderNav
  }
}
</script>

<style>
</style>
