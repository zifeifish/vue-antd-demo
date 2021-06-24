<template>
  <div>
    <a-dropdown>
      <div style="width: 200px; text-align: right">
        <a-avatar
          style="backgroundcolor: #87d068; cursor: pointer"
          size="small"
          icon="user"
        />
        <span style="margin-left: 10px; cursor: pointer">管理员</span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a-row style="text-align: center">
            <img style="width: 80px" src="~@/assets/images/avatar.png" alt="" />
            <h4 style="margin-top: 10px">王铮</h4>
          </a-row>
          <a-divider />
          <a-row style="text-align: right">
            <a-button @click="exitLogin">
              <a-icon type="logout" />
              <span>注销</span>
            </a-button>
          </a-row>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: "GolbalHeader",
  methods: {
    exitLogin() {
      this.$confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk: () => {
          this.$router.push("/");
          // return this.Logout({})
          //   .then(() => {
          //     setTimeout(() => {
          //       const url = `${process.env.VUE_APP_HOME_URL}/sos/login?redirect=${location.href}`;
          //       window.open(url, "_self");
          //     }, 16);
          //   })
          //   .catch((err) => {
          //     this.$message.error({
          //       title: "错误",
          //       description: err.message,
          //     });
          //   });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style>
</style>