<template>
  <div class="loading-box" v-show="show">
    <div class="loading-content">
      <a-spin :tip="text"></a-spin>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "正在加载中...",
    },
  },
};
</script>
<style lang="less" scoped>
.loading-box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  .loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
