<template>
  <ul class="aside-list">
    <li class="aside-list-item">
      <a>sdfs</a>
    </li>
    <li class="aside-list-item">
      <a>sdfs</a>
    </li>
    <li class="aside-list-item">
      <a>sdfs</a>
    </li>
    <li class="aside-list-item">
      <a>sdfs</a>
    </li>
  </ul>
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  .aside-list
    position absolute
    top 20px
    right -200px
    width 200px
    padding-left 0 !important
    list-style none
    @media screen and (max-width: 1250px)
      &
        display none
    .aside-list-item
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 1.8em
      padding-bottom 1px
      a
        color $light
        &:hover
          color $green
          border-bottom 2px solid $green
</style>
<script>
  export default {
    props: {
      domId: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    ready () {
      this.$nextTick(() => {
        console.log(document.querySelector(`#${this.domId}`).textContent)
        console.log(document.querySelectorAll(`#${this.domId} h1,h2,h3`))
      })
    }
  }
</script>
