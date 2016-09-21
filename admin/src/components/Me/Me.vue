<template>
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <div class="ovh">
      <h3 class="page-title">关于我 <button type="button" class="btn btn-save r" style="margin-right: 50px;margin-top:-6px" @click="save">保存</button></h3>
      <editor :content.sync="content"></editor>

    </div>
  </div>
</template>
<style lang="stylus">
</style>
<script>
  import NavAside from '../Common/NavAside.vue'
  import Editor from '../Common/Editor.vue'
  import service from '../../services/me/index'
  export default {
    components:{
      NavAside,
      Editor
    },
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
    },
    methods:{
      save(){
        service.modifyAboutMe(this.content).then(res => {
          if(res.success){
            alert('保存成功');
          }
        }).catch(error => {
          alert('保存失败');
        })
      }
    }
  }
</script>
