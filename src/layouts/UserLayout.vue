<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="~@/assets/images/logo.png" class="logo" alt="链融科技" />
        </div>
      </div>

      <router-view></router-view>

      <div class="footer">
        ©深圳市链融科技股份有限公司版权所有 2017-2021
        <img src="~@/assets/images/police.png" />
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402004002"
          target="_blank"
          >粤公网安备 44030402004002号</a
        >&nbsp;<a href="http://beian.miit.gov.cn/" target="_blank"
          >粤ICP备17097165号</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
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
      color: #fff;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
      img {
        margin: 0 5px;
      }
      a {
        color: #fff;
        transition: all 0.3s;
        margin: 0 5px;
      }
    }
  }
}
</style>