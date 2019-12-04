<template>
  <div id="reg">
    <router-link :to="{name:'Login'}">点击直接登录</router-link>
    <van-steps :active="active">
      <van-step>验证手机号</van-step>
      <van-step>设置账户信息</van-step>
      <van-step>注册成功</van-step>
    </van-steps>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: Number(localStorage.getItem("regCount")) || 0
    };
  },
  created() {
    this.changeNum();
  },
  methods: {
    changeNum() {
      console.log(this.$route.path)
      if(this.$route.path=='/Reg'||this.$route.path=='/Reg/verify'){
        localStorage.setItem('regCount', 0)
      }
    }
  }
};
</script>