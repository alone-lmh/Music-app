<template>
  <div class="verify">
    <br />
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary" @click="getCode">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <br />
    <van-popup class="regModelVer" v-model="warn" round :style="{ width: '80%'}">
      <P v-show="pFlag">请输入正确的手机号</P>
      <p v-show="!pFlag">请输入正确的验证码</p>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return { phone: "", code: "", warn: false, pFlag: true ,next:false};
  },
  methods: {
    getCode() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.pFlag = true;
        this.warn = true;
      } else {
        this.$axios
          .get("http://121.41.30.226:3000/captcha/sent?phone=" + this.phone)
          .then(response => {
            if (response.data.code !== 200) {
              this.pFlag = true;
              this.warn = true;
            }
          });
      }
    },
    phoneVerify() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.pFlag = true;
        this.warn = true;
      } else if (!/^\d{4}$/.test(this.code)) {
        this.pFlag = false;
        this.warn = true;
      } else {
        this.$axios
          .get(
            "http://121.41.30.226:3000/captcha/verify?phone=" +
              this.phone +
              "&captcha=" +
              this.code
          )
          .then(response => {
            if (response.data.code == 200) {
              this.next=true;
            } else {
              this.pFlag = false;
              this.warn = true;
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.van-popup--center {
  text-align: center;
}
</style>