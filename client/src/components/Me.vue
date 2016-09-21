<template>
    <div>
      <article class="post">
        <p v-html="content | markdown">
        </p>
      </article>
    </div>
</template>
<script>
  import service from '../services/me/index'
  export default{
    data(){
      return {
        content:''
      }
    },
    route:{
      data(){
        return service.getAboutMe().then(res => {
          if(res.success){
            this.content = res.data.content;
          }
        }).catch(err => {
          alert('获取内容失败');
        })
      }
    }
  }
</script>
