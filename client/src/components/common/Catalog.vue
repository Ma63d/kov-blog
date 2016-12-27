<template>
  <div>
    <div class="circle-button catalog-show" @click="catalogShow = !catalogShow">
      目录
    </div>
    <div class="circle-button to-top" @click="toTop">
      top
    </div>
  </div>
  <div class="aside-list" v-show="catalogShow" transition="fade">
    <catalog-list :node-arr="nodeArr">
    </catalog-list>
  </div>
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  .circle-button
    position fixed
    text-align center
    right 1em
    display block
    width 2.5em
    height 2.5em
    line-height 2.5em
    border-radius 50%
    border 1px solid #f1f1f1
    background-color #fff
    color #909090
    cursor pointer
    box-shadow 0 0 5px #f1f1f1
    -webkit-transition text-shadow .3s,color .3s
    transition text-shadow .3s,color .3s
    &.to-top
      bottom 1em
    &.catalog-show
      bottom 5em
      @media screen and (max-width: 1250px)
        &
          display none
    &:hover
      box-shadow 0 0 5px #ddd
  .aside-list
    position fixed
    bottom 10em
    right 1em
    width 200px
    border-right 2px solid #ddd
    padding-right 10px
    background #fff
    @media screen and (max-width: 1250px)
      &
        display none
    ul
      list-style none
      margin 0!important
      padding-left 1em!important
    &>div>ul
      padding-left 0!important
    li
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 1.8em
      padding-bottom 1px
      a
        font-weight 400
        color $light
        &:hover
          color $green
          border-bottom 2px solid $green
</style>
<script>
  import CatalogList from './CatalogList.vue'
  import _ from 'lodash'
  class CatalogNode {
    constructor (text, element) {
      this.text = text;
      this.element = element;
    }
  }
  function addHeaderToArr (resultArr,domArr, index, level) {
    let i = index
    for(; i < domArr.length;){
      if(~~domArr[i].tagName[1] === level){
        resultArr.push(new CatalogNode(domArr[i].innerText, domArr[i]));
        i++;
      } else if (~~domArr[i].tagName[1] > level) {
        let currentArr = [];
        i += addHeaderToArr(currentArr, domArr, i, level+1);
        resultArr.push(currentArr);
      } else if (~~domArr[i].tagName[1] < level) {
        return i - index;
      }
    }
    return i - index;
  }
  export default {
    props: {
      domId: {
        type: String
      }
    },
    data () {
      return {
        nodeArr: [],
        catalogShow: false
      }
    },
    ready () {
      this.buildCatalog()
    },
    methods: {
      buildCatalog () {
        this.$nextTick(() => {
          let doms = document.querySelectorAll(`#${this.domId} h1,#${this.domId} h2,#${this.domId} h3`)
          let result = []
          addHeaderToArr(result, doms, 0, 2)
          this.nodeArr = result
        })
      },
      toTop () {
        window.scrollTo(0,0)
      }
    },
    components: {
      CatalogList
    },
    event : {
      'catalog-refresh': function () {
        this.buildCatalog()
      }
    }
  }
</script>
