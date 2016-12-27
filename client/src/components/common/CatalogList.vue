<template>
  <!--这个div用来避免这个组件在递归时成为片段实例-->
  <div>
    <ul v-for="node in nodeArr">
      <component :is="isArray(node) ? 'catalog-list' : 'catalog-item'" :node-arr="node" :node="node">
      </component>
    </ul>
  </div>

</template>
<script>
  import CatalogItem from './CatalogItem.vue'
  export default {
    name: 'catalog-list',
    props: {
      nodeArr: {
        type: Array
      }
    },
    components: {
      CatalogItem
    },
    methods: {
      isArray (obj) {
        return Object.prototype.toString.call(obj).slice(8,13) === 'Array'
      }
    }
  }
</script>
