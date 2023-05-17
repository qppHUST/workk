<template>
  <div class="login-container bgImg content">
    
    <section class="login-logo">
      <svg-icon icon="logo" style="width:220px;height:90" viewBox="0 0 170 70"/>
    </section>
    <Verify
      @success="success"
      :mode="'pop'"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    ></Verify>
    <section class="doc">
      <a style="font-weight:500;color:#1890ff" href="https://www.kdocs.cn/l/cizEf2BEZbWM" target="_blank">
        接口文档说明
        <a-icon type="question-circle" />
      </a>
    </section>
    <div class="layout">
      <a-form-model
        :model="loginForm"
        :rules="loginRules"
        class="login-form-container"
        :wrapper-col="{ span: 24 }"
        ref="loginForm"
      >
        <a-tabs v-model="currentTab" class="tabs" :tabBarGutter="10">
          <a-tab-pane key="user" tab="账号密码登录">
            <a-form-model-item prop="username" v-if="currentTab === 'user'">
              <a-input v-model="loginForm.username" placeholder="请输入账号" allow-clear @pressEnter="focusPassword">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password" v-if="currentTab === 'user'">
              <a-input-password
                v-model="loginForm.password"
                placeholder="请输入密码"
                allow-clear
                @pressEnter="toLogin"
                ref="password"
              >
                <svg-icon icon="password" :size="14" slot="prefix"> </svg-icon>
              </a-input-password>
            </a-form-model-item>
            <!-- <a-form-model-item prop="username" v-if="currentTab === 'user'">
              <a-input v-model="loginForm.username" placeholder="请输入MFA" allow-clear @pressEnter="focusPassword">
                <svg-icon icon="mfa" :size="14" slot="prefix" />
              </a-input>
            </a-form-model-item> -->
          </a-tab-pane>
          <a-tab-pane key="phone" tab="手机号登录">
            <a-form-model-item prop="phone" v-if="currentTab === 'phone'">
              <a-input v-model="loginForm.phone" placeholder="请输入手机号" allow-clear :maxLength="11" type="text">
                <svg-icon icon="phone" :size="14" slot="prefix"> </svg-icon>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="code" v-if="currentTab === 'phone'">
              <a-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                :maxLength="6"
                style="width: 58%"
                ref="code"
                @pressEnter="toLogin"
              >
              </a-input>
              <a-button @click="getCode" :disabled="codeStatus" style="width: 35%; margin-left: 7%">{{
                phoneCode
              }}</a-button>
            </a-form-model-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item style="margin-top: -7px">
          <a-button type="primary" block size="large" :loading="loading" @click="toLogin"> 登录 </a-button>
        </a-form-item>
        <a-form-item style="margin-top: -7px">
          <a-checkbox v-model="loginForm.remember" v-if="currentTab === 'user'">记住密码</a-checkbox>
          <span class="forge-password pointer">忘记密码</span>
        </a-form-item>
        <!-- <a-form-item style="margin-top: -20px">
          <span style="margin-right: 15px">其他登录方式</span>
          <svg-icon icon="weixin" :size="25" class="pointer verticalMiddle"></svg-icon>
          <svg-icon icon="qq" :size="25" style="margin:0 14px" class="pointer verticalMiddle"></svg-icon>
          <svg-icon icon="zhifubao" :size="25" class="pointer verticalMiddle"></svg-icon>
          <span class="forge-password pointer">注册账户</span>
        </a-form-item> -->
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Verify from '@/components/verifition/Verify.vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
// import {  SafetyOutlined } from '@ant-design/icons-vue';
import { isPhone, isPassWord, isCode } from '@/utils/validate';
import { getCache, setCache, removeCache } from '@/utils/session';
import { getPhoneCode } from '@/api/user';
export default {
  name: 'login',
  components: {
    Verify,

  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassWord(value)) {
        callback(new Error('请正确输入密码'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error('手机号码有误，请重新填写'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!isCode(value)) {
        callback(new Error('验证码有误，请重新填写'));
      } else {
        callback();
      }
    };

    return {
      currentTab: 'user',
      loginForm: {
        username: '',
        password: '',
        phone: '',
        code: '',
        remember: true
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      phoneCode: '获取验证码',
      codeStatus: false,
      currentCode: null
    };
  },
  mounted() {
    const cache = getCache('LOGIN_INFO');
    if (cache) {
      this.loginForm.username = cache.username;
      this.loginForm.password = cache.password;
    }
  },
  methods: {
    success(params) {
      console.log(params);
      console.log(111);
    },
    useVerify() {
      this.$refs.verify.show();
    },
    focusPassword() {
      this.$refs.password.focus();
    },
    //获取验证码
    getCode() {
      if (isPhone(this.loginForm.phone)) {
        this.codeStatus = true;
        let time = 60;
        var getPhoneIntval = setInterval(() => {
          if (time > 0) {
            time--;
            this.phoneCode = `重新获取(${time}s)`;
          } else {
            clearInterval(getPhoneIntval);
            getPhoneIntval = null;
            this.phoneCode = '获取验证码';
            this.codeStatus = false;
          }
        }, 1000);

        this.$refs.code.focus();
        getPhoneCode().then(res => {
          this.currentCode = res.data;
          setTimeout(() => {
            this.$notification.success(
              {
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.data
              },
              12
            );
          }, 1000);
        });
      } else {
        this.$message.error('请正确输入手机号');
      }
    },
    //登录
    toLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.currentTab === 'user') {
            console.log("user match")
            const { username, password } = this.loginForm;
            this.$store
              .dispatch('user/login', { username, password })
              .then(() => {
                if (this.loginForm.remember) {
                  console.log("remember")
                  setCache('LOGIN_INFO', { username, password });
                  // this.$refs.verify.show();

                  this.$router.push({
                    path: '/index'
                  });
                  this.loading = false;
                } else {
                  removeCache('LOGIN_INFO');
                }
              })
              .catch(() => {
                setTimeout(() => {
                  this.loading = false;
                }, 500);
              });
          } else if (this.currentTab === 'phone') {
            const { phone, code } = this.loginForm;
            this.$store
              .dispatch('user/codeTest', { phone, code })
              .then(() => {
                removeCache('LOGIN_INFO');
                this.$router.push({
                  path: '/index'
                });
                this.loading = false;
              })
              .catch(() => {
                setTimeout(() => {
                  this.loading = false;
                }, 500);
              });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  background-image: url('~@/assets/login/bg.png');
  background-size: cover;
  height: 100%;
  .login-logo {
    position: absolute;
    left: 20px;
    top: 20px;
    .logo {
      width: 64px;
      float: left;
    }
    .name {
      color: #f89060;
      font-size: 48px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .doc {
    position: absolute;
    right: 20px;
    top: 30px;
  }
  .layout {
    width: 79%;
    min-width: 900px;
    margin: 0 auto;
    padding-top: 52%;
    transform: translateY(-50%);
    .login-form-container {
      background: #fff;
      width: 400px;
      height: 450px;
      margin: 0 auto;
      margin-right: 0;
      padding: 45px;
      box-shadow: 4px 4px 15px #aaa;
      border-radius: 6px;
      .title {
        font-weight: 700;
        font-size: 1.8rem;
        padding-left: 5px;
      }
      .tabs {
        margin: 15px 0;
      }
      .forge-password {
        font-size: 14px;
        float: right;
        color: #1890ff;
      }
    }
  }
}
</style>
<style lang="scss">
.login-container {
  .ant-tabs-bar {
    border-bottom: none !important;
  }
  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 35px !important;
  }
  .ant-tabs-bar {
    margin-bottom: 30px !important;
  }
}
</style>
