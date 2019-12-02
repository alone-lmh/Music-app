<template>
  <div id="login">
    <router-link :to="{name:'Reg'}">前去注册</router-link>
    <br />
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号" required />
      <br />
      <van-field type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <br />
    <van-switch class="switch" v-model="checked" size="20px"/>记住密码
    <br />
    <br />
    <van-button size="large" round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="loginHandle">登录</van-button>
  </div>
</template>
<script>
export default {
    data() {
    return {
      checked: true
    };
  },
  methods: {
    loginHandle(){
      this.$router.push({path:'/'})
    }
  },
}
</script>
<style scoped>
    .switch{margin:0 20px;}
</style>