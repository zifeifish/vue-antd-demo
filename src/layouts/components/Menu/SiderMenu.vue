<template>
  <div style="width: 256px">
    <a-menu
      v-model="selectedKeys"
      :open-keys="openKeys"
      :mode="mode"
      :theme="theme"
      :inline-collapsed="collapsed"
      @openChange="onOpenChange"
    >
      <template v-for="menuInfo in menu">
        <a-menu-item v-if="!menuInfo.children" :key="menuInfo.path" @click="navTo(menuInfo.path)">
          <a-icon v-if="menuInfo.icon" :type="menuInfo.icon" />
          <span>{{ menuInfo.title }}</span>
        </a-menu-item>
        <template v-if="menuInfo.children">
          <a-sub-menu :key="menuInfo.path">
            <span slot="title">
              <a-icon v-if="menuInfo.icon" :type="menuInfo.icon" />
              <span>{{ menuInfo.title }}</span>
            </span>
            <template v-for="item in menuInfo.children">
              <a-menu-item
                v-if="!item.children"
                :key="item.path"
                @click="navTo(item.path)"
              >
                <a-icon v-if="item.icon" :type="item.icon" />
                <span>{{ item.title }}</span>
              </a-menu-item>
              <sub-menu v-else :key="item.path" :menu-info="item" />
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  name: "SiderMenu",
  components: {
    "sub-menu": SubMenu,
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline",
    },
    theme: {
      type: String,
      required: false,
      default: "dark",
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    menu: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      current: "",
      // 当前展开的 SubMenu 菜单项 key 数组
      openKeys: [],
      // 当前选中的菜单项 key 数组
      selectedKeys: ["/record/mail"],
    };
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      const keys = [];
      vm.menu.forEach((item) => keys.push(item.path));
      return keys;
    },
  },
  created() {
    const activeSubPath = this.$route.matched[0].path;
    const activePath = this.$route.path;
    this.openKeys = activeSubPath ? [activeSubPath] : [];
    this.selectedKeys = activePath ? [activePath] : [];
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    navTo(path) {
      this.$router.push(path);
    },
  },
};
</script>
