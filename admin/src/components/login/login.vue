<template>
  <div>
    <header>
      <!--<img src="../../asset/img/neotel.png" alt="neotel">-->
    </header>
    <div id="container">
      <div class="flash-bar danger" v-show="loginErr">登录失败</div>
      <section class="login-box">
        <div class="login-header">
          <h3>
            博客后台登录
          </h3>
        </div>
        <div class="login-body">
          <input type="text" class="form-control top" placeholder="用户名" v-model="username">
          <input type="password" class="form-control bottom" placeholder="密码" v-model="password" @keyup.13="login">
        </div>
        <div class="login-footer">
          <div class="login-button-Container">
            <button class="btn btn-save btn-block" @click="login">
              登录
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import service from "../../services/login/index.js"
  import state from "../../store/index.js"
  export default {
    data:()=>({
    username:"",
    password:"",
    loginErr:false
  }),
  methods:{
    login(){
      service.createToken(this.username,this.password).then((res)=>{
        if(true === res.success){
          state.token = res.data.token;
          state.uid = res.data.uid;
          state.name = res.data.name;
          //this.$route.router.replace('index')
        }else{
          this.loginErr = true;
        }
    })
    }
  }
  }

</script>

<style lang="stylus" scoped>
  header
    padding 10px 0
    text-align center
    border-bottom 1px solid #EEE
    margin-bottom 20px
    img
      height  35px
  #container
    max-width 400px
    margin 0 auto
    padding 32px 15px
    .login-box
      background #fafafa
      border-radius 10px
      box-shadow 0 0px 2px #CCC
      padding 15px
      .login-header
        h3
          text-align center
          font-weight 300
          line-height 1.5
          margin 0 0 10px 0
      .login-button-Container
        width 200px
        margin 0 auto
</style>
