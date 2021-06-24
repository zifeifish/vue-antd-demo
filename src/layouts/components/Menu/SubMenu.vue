<template>
  <div>
    <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
      <span slot="title">
        <a-icon v-if="menuInfo.icon" :type="menuInfo.icon" />
        <span>{{ menuInfo.title }}</span>
      </span>
      <template v-for="item in menuInfo.children">
        <a-menu-item
          v-if="!item.children"
          :key="item.key"
          @click="navTo(item.path)"
        >
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-sub-menu>
  </div>
</template>

<script>
import { Menu } from "ant-design-vue";
export default {
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    navTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
</style>