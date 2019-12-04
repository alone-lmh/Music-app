<template>
  <div class="verify">
    <br />
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <br />
    <van-button
      size="large"
      round
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="next"
    >下一步</van-button>
  </div>
</template>
<script>
export default {
  methods: {
    next() {
      this.$router.push({ path: "/Reg/bsgMsg" });
      this.$emit("to-parent",this.active);
      this.$store.commit('changeRegCount',{number:1})
    }
  }
};
</script>