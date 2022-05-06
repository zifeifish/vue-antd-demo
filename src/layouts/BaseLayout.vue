<template>
  <a-layout id="layout-container">
    <a-layout-sider
      width="256px"
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

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="display: flex; justify-content: space-between">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <golbal-header style="margin-right: 50px"></golbal-header>
        </div>
      </a-layout-header>
      <nav-header style="margin-top: 2px"></nav-header>
      <a-layout-content
        :style="{
          margin: '30px 24px',
          minHeight: '280px',
          overflowY: 'scroll',
        }"
      >
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer style="padding: 10px 50px">
        <golbal-footer></golbal-footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import SiderMenu from "./components/Menu/SiderMenu";
import GolbalFooter from "./components/GolbalFooter/GolbalFooter";
import GolbalHeader from "./components/GolbalHeader/GolbalHeader";
import NavHeader from "./components/NavHeader/NavHeader";
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
        // {
        //   path: '/edit-article',
        //   icon: "fund",
        //   title: "文本编辑",
        //   children: [
        //     {
        //       path: "/edit-article/index",
        //       title: "信息设置",
        //     }
        //   ]
        // },
        {
          path: "/edit-article/index",
          icon: "setting",
          title: "9999",
        }
      ],
    };
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
</style>
