<template>
  <div class="nav-box">
    <a-breadcrumb>
      <a-breadcrumb-item
        v-for="(item, index) in breadCrumbList"
        :key="item.name"
      >
        <router-link
          v-if="index !== 0 && name !== item.name"
          :to="item.path ? item.path : '/'"
        >
          {{ item.meta.title }}
        </router-link>
        <span v-else>{{ item.meta.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      name: "",
      breadCrumbList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.name = this.$route.name;
      const { matched } = this.$route;
      this.breadCrumbList = matched;
    },
  },
};
</script>

<style lange="less" scoped>
.nav-box {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: #fff;
}
</style>