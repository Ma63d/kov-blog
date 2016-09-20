<template>
  <div id="duoshuo-comment">

  </div>
</template>
<script>
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    },
    props:{
      'data-thread-key':{
        type:String,
        required: true
      },
      'data-title':{
        type:String,
        required: true
      },
      'data-url':{
        type:String,
        required: true
      }
    },
    ready(){
      console.log('ready');

    }
  }
</script>
