<template>
  <div class="bsgMsg">
      <br/>
    <van-cell-group>
      <van-field required clearable label="用户名" placeholder="请输入用户名" />
      <br/>
      <van-field type="password" label="密码" placeholder="请输入密码" required />
      <br/>
      <van-field type="password" label="验证密码" placeholder="请输入密码" required />
    </van-cell-group>
    <br/>
    <van-button
      size="large"
      round
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="next"
    >注册</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2
    };
  },
  methods: {
    next() {
      this.$router.push({ path: "/Reg/login" });
    }
  }
};
</script>