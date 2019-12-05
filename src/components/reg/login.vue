<template>
  <div class="login">
    <br />
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号" required />
      <br />
      <van-field type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <br />
    <van-button
      size="large"
      round
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="next"
    >登录</van-button>
  </div>
</template>
<script>
export default {
  methods: {
    next() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>