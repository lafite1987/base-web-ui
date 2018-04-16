<template>
  <el-form :model="authInfo" :rules="formRules" ref="authInfo" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="accountType">
      <el-select v-model="authInfo.accountType" placeholder="账号类型">
        <el-option value="USERNAME" label="账户名" />
        <el-option value="PHONE" label="手机" />
      </el-select>
    </el-form-item>
    <el-form-item prop="account">
      <el-input type="text" v-model="authInfo.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input type="password" v-model="authInfo.password" auto-complete="off" placeholder="账号密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import api from '../api';
export default {
  data() {
    return {
      captchaGetting: false,
      logining: false,
      authInfo: {
        accountType: '账户名',
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.authInfo.resetFields();
    },
    handleSubmit2(ev) {
      this.$refs.authInfo.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = { username: this.authInfo.account, password: this.authInfo.password };
          api.auth.login(this.authInfo).then(res => {
            this.logining = false;
            if (res.data.code == 200) {
              storeSession.set("token", res.data.data);
              this.$router.push({ path: '/' });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>