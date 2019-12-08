<template>
  <div class="bsgMsg">
    <br />
    <van-cell-group>
      <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />
      <br />
      <van-field v-model="psw" type="password" label="密码" placeholder="请输入密码" required />
      <br />
    </van-cell-group>
    <br />
    <van-popup class="regModelVer" v-model="warn" round :style="{ width: '80%'}">
      <P v-show="pFlag">用户名应为5-13位字符</P>
      <p v-show="!pFlag">密码密码至少包含数字和英文，长度6-18</p>
    </van-popup>
    <van-popup v-model="fail" round :style="{ width: '80%'}">
      {{message}}
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {message:'', next:false,fail:false, username: "", psw: "", pFlag: true, warn: false };
  },
  methods: {
    register() {
      if (!/^\S{6,13}$/.test(this.username)) {
        this.pFlag = true;
        this.warn = true;
      } else if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(
          this.psw
        )
      ) {
        this.warn = true;
        this.pFlag = false;
      }else{
        this.$axios.get("http://121.41.30.226:3000/register/cellphone?phone="+this.$parent.phone+"&password="+this.psw+"&captcha="+this.$parent.code+"&nickname="+this.username).then((response)=>{
          if(response.data.code==200){
            this.next=true;
          }else{
            this.message=response.data.message;
            this.fail=true;
          }
        })
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