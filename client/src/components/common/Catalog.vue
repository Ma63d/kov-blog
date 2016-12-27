<template>
  <div class="aside-list">
    <catalog-list :node-arr="nodeArr">
    </catalog-list>
  </div>
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  .aside-list
    position absolute
    top 20px
    right -200px
    width 200px
    border-left 2px solid #ddd
    padding-left 10px
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
        nodeArr: []
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
