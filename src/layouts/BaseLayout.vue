<template>
  <a-layout id="layout-container">
    <a-layout-sider
      width="240px"
      style="z-index: 9"
      v-model="collapsed"
      :trigger="null"
      :collapsible="collapsible"
    >
      <div class="logo">
        <img src="" alt="logo" />
        <h1 v-if="!collapsed">葱姜蒜通知平台</h1>
      </div>
      <sider-menu
        :mode="mode"
        :theme="theme"
        :menu="menu"
        :collapsed="collapsed"
      ></sider-menu>
    </a-layout-sider>

    <a-layout id="backTopRef">
      <a-layout-header style="background: #fff; padding: 0">
        <div style="display: flex; justify-content: space-between">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggle()"
          />
          <golbal-header
            style="margin-right: 50px"
            @toggle="toggle"
          ></golbal-header>
        </div>
      </a-layout-header>
      <nav-header style="margin-top: 2px"></nav-header>
      <a-layout-content
        :style="{
          margin: '30px 15px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="padding: 10px 50px">
        <golbal-footer></golbal-footer>
      </a-layout-footer>
      <a-back-top :target="backTopDom">
        <div class="ant-back-top-content">
          <div class="back-top-icon">
            <a-icon type="vertical-align-top" />
          </div>
        </div>
      </a-back-top>
    </a-layout>
  </a-layout>
</template>
<script>
import SiderMenu from "./components/Menu/SiderMenu";
import GolbalFooter from "./components/GolbalFooter/GolbalFooter";
import GolbalHeader from "./components/GolbalHeader/GolbalHeader";
import NavHeader from "./components/NavHeader/NavHeader";
import { mapActions } from "vuex";
export default {
  name: "BaseLayout",
  components: {
    SiderMenu,
    GolbalFooter,
    GolbalHeader,
    NavHeader,
  },
  data() {
    return {
      collapsed: false,
      mode: "inline",
      theme: "dark",
      collapsible: true,
      menu: [
        {
          path: "/record",
          icon: "fund",
          title: "发送通知记录",
          children: [
            {
              path: "/record/message",
              title: "短信记录",
            },
            {
              path: "/record/mail",
              title: "邮件记录",
            },
          ],
        },
        {
          path: "/set",
          icon: "setting",
          title: "设置",
          children: [
            {
              path: "/set/message",
              title: "信息设置",
            },
            {
              path: "/set/mail",
              title: "邮件设置",
            },
          ],
        },
        {
          path: "/edit-article/index",
          icon: "edit",
          title: "编辑文章",
        },
        {
          path: "/compress-image/index",
          icon: "upload",
          title: "压缩文件",
        },
        {
          path: "/map/china",
          icon: "upload",
          title: "中国地图",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["setSidebar"]),
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    },
    backTopDom() {
      const backDom = document.getElementById("backTopRef");
      return backDom;
    },
  },
};
</script>
<style lang="less" scoped>
#layout-container {
  height: 100%;
}

#layout-container .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout-container .trigger:hover {
  color: #1890ff;
}

#layout-container .logo {
  display: flex;
  height: 64px;
  line-height: 64px;
  align-items: center;
  padding-left: 24px;
  background: #002140;

  img {
    height: 32px;
  }

  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
  }

  .layout-header {
    display: flex;
    justify-content: space-around;
  }
}
.back-top-icon {
  font-size: 24px;
  line-height: 40px;
}

/deep/ .ant-layout-content {
  min-height: auto;
}
</style>
