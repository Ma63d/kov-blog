<template>
    <li>
      <a href="javascript:;">
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
    }
</script>
