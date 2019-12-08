<template>
  <div id="reg">
    <div class="loginHead">
      <img class="headImg" src="../../public/head.png" alt />
      <br />
      <router-link :to="{name:'Login'}">点击直接登录</router-link>
    </div>
    <van-steps :active="active">
      <van-step>验证手机号</van-step>
      <van-step>设置账户信息</van-step>
      <van-step>注册成功</van-step>
    </van-steps>
    <verify v-show="verifyFlag" ref="getVerify"></verify>
    <bsgMsg v-show="bsgMsgFlag" ref="getBsg"></bsgMsg>
    <login v-show="loginFlag" ref="getFn"></login>
    <van-button
      class="next"
      size="large"
      round
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="nextType"
    >下一步</van-button>
  </div>
</template>
<script>
import verify from "../components/reg/verify.vue";
import bsgMsg from "../components/reg/bsgMsg.vue";
import login from "../components/reg/login.vue";
export default {
  data() {
    return {
      active: 0,
      verifyFlag: true,
      bsgMsgFlag: false,
      loginFlag: false,
      phone: "",
      code: "",
      username: "",
      psw: "",
      next: false
    };
  },
  components: {
    verify,
    bsgMsg,
    login
  },
  methods: {
    nextType() {
      this.active++;
      if (this.active == 1) {
        //调用验证短信验证码的方法
        this.$refs.getVerify.phoneVerify();
        this.next = this.$refs.getVerify.next;
        setTimeout(() => {
          if (this.next) {
            this.verifyFlag = false;
            this.bsgMsgFlag = true;
            this.loginFlag = false;
            this.phone = this.$refs.getVerify.phone;
            this.code = this.$refs.getVerify.code;
            document.querySelector(".next .van-button__text").innerText =
              "注册";
          } else {
            this.verifyFlag = true;
            this.bsgMsgFlag = false;
            this.loginFlag = false;
            this.active = 0;
          }
        });
      }

      if (this.active == 2) {
        //调用注册方法
        this.$refs.getBsg.register();
        this.next = this.$refs.getBsg.next;
        setTimeout(() => {
          if (this.next) {
            this.verifyFlag = false;
            this.bsgMsgFlag = false;
            this.loginFlag = true;
            document.querySelector(".next .van-button__text").innerText =
              "登录";
          } else {
            this.verifyFlag = false;
            this.bsgMsgFlag = true;
            this.loginFlag = false;
            this.active = 1;
          }
        });
      }
      if (this.active == 3) {
        this.$refs.getFn.loginHandle();
        this.active = 2;
      }
    }
  }
};
</script>
<style scoped>
#reg {
  padding: 3em 2em 0;
}
.loginHead {
  text-align: center;
  margin-bottom: 2em;
}
.headImg {
  width: 10em;
  margin-bottom: 1em;
}
</style>