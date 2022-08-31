<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <nav>
        <mrouter-link to="/403">403</mrouter-link>
        <mrouter-link to="/404">404</mrouter-link>
      </nav>
      <mrouter-view></mrouter-view>
      <!-- <router-view></router-view> -->
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
      version: process.env.VUE_APP_VERSION,
    };
  },
  created() {
    this.checkVersion();
  },
  methods: {
    checkVersion() {
      let that = this;
      const cacheVersion = window.localStorage.getItem("hcy-version");
      if (cacheVersion !== this.version) {
        this.$info({
          title: "发现新版本",
          okText: "去更新",
          keyboard: false,
          onOk() {
            window.localStorage.setItem("hcy-version", that.version);
            location.reload();
          }
        });
      }
    },
  },
};
</script>

<style lang="less">
@import "./style/base.less";
#app {
  height: 100%;
  nav {
    text-align: center;
    a {
      margin: 0 30px;
      font-weight: bold;
      font-size: 30px;
      text-decoration: underline;
    }
  }
}
</style>
