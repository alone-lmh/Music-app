<template>
  <div id="reg">
    <router-link :to="{name:'Login'}">点击直接登录</router-link>
    <van-steps :active="active" @to-parent="childEvent">
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
      active: 0
    };
  },
  methods: {
    childEvent(v) {
      this.active = v;
      console.log(v)
    }
  }
};
</script>