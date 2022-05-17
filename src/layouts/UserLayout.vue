<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="" class="logo" alt="葱姜蒜科技" />
        </div>
      </div>

      <router-view></router-view>

      <div class="footer">
        ©葱姜蒜科技有限公司版权所有 2017-{{currentYear}} {{version}}
        <a href="http://beian.miit.gov.cn/" target="_blank"
          >粤ICP备2022042012号-1</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      version: process.env.VUE_APP_VERSION
    }
  },
  created() {
    console.log('version', process.env.VUE_APP_VERSION)
  },
};
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: url("~@/assets/images/bg/bg-login-bg.png") no-repeat;
    background-size: 100%;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      height: 60px;
      display: flex;
      align-items: center;

      .header {
        height: 100%;
        margin-left: 20%;
        margin-top: 10px;
        .logo {
          cursor: pointer;
        }
      }
    }

    .footer {
      position: absolute;
      display: flex;
      justify-content: center;
      width: 100%;
      color: rgba(239,229,229,0.45);
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
      img {
        margin: 0 5px;
      }
      a {
        transition: all 0.3s;
        margin: 0 5px;
      }
    }
  }
}
</style>