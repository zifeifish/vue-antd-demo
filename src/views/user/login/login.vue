<template>
  <div class="main">
    <div class="login-box">
      <div class="login-title">链融消息通知平台</div>
      <div class="login-form">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <div class="form-title">登录</div>
          <a-alert
            v-if="isLoginError"
            type="error"
            show-icon
            style="margin-bottom: 24px"
            message="账户或密码错误"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户"
              v-decorator="[
                'userName',
                {
                  initialValue: 'admin',
                  rules: [
                    { required: true, message: '请输入帐户名' },
                    { validator: handleUserNameOrEmail },
                  ],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
              v-decorator="[
                'password',
                {
                  initialValue: '123456',
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item style="margin-top: 24px">
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              >确定</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginBtn: false,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false,
      },
    };
  },
  created() {},
  methods: {
    ...mapActions(["Login"]),
    // handler
    handleUserNameOrEmail(rule, value, callback) {
      callback();
    },

    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        // Login,
      } = this;

      state.loginBtn = true;

      const validateFieldsKey = ["userName", "password"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          delete loginParams.userName;
          loginParams.userName = values.userName;
          loginParams.password = values.password;
          this.loginSuccess({});

          // Login(loginParams)
          //   .then((res) => this.loginSuccess(res))
          //   .catch((err) => this.requestFailed(err))
          //   .finally(() => {
          //     state.loginBtn = false;
          //   });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },

    loginSuccess(res) {
      console.log("login success", res);
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      this.Login().then((d) => {
        console.log(d);
        this.$router.push({ path: "/record/message" });
        setTimeout(() => {
          this.$notification.success({
            message: "欢迎",
            description: `${this.timeFix()}，欢迎回来`,
          });
        }, 600);
        this.isLoginError = false;
      });
    },

    requestFailed(err) {
      this.isLoginError = true;
      this.$notification["error"]({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4,
      });
    },
    timeFix() {
      const time = new Date();
      const hour = time.getHours();
      return hour < 9
        ? "早上好"
        : hour <= 11
        ? "上午好"
        : hour <= 13
        ? "中午好"
        : hour < 20
        ? "下午好"
        : "晚上好";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  min-width: 260px;
  width: 400px;
  margin-top: 10%;
  margin-left: 60%;
  .login-title {
    color: #fff;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: 3px;
    text-align: center;
  }
  .login-form {
    border-radius: 4px;
    background-color: rgba(6, 141, 255, 0.08);
    margin-top: 36px;
    position: relative;
    box-shadow: 6px 8px 8px rgb(33 33 33 / 10%),
      -6px 8px 8px rgb(33 33 33 / 10%);
    transition: all 0.4s;
    #formLogin {
      padding: 40px;
      .form-title {
        text-align: center;
        font-size: 20px;
        color: hsla(0, 0%, 100%, 0.8);
        margin-bottom: 40px;
      }
    }
  }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
