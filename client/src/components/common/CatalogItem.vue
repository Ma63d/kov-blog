<template>
    <li>
      <a href="javascript:;" @click="scrollTo(node)">
        {{node.text}}
      </a>
    </li>
</template>
<script>
    export default {
      props: {
        node: {
          type: Object
        }
      },
      methods: {
        scrollTo (node) {
          let dom = node.element
          window.scrollTo(0,dom.offsetTop);
        }
      }
    }
</script>
