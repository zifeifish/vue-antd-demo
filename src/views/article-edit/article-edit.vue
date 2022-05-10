<template>
  <div style="padding: 50px;">
    <h1>编辑</h1>
    <div style="height: 300px;overflow-y: auto;border: 1px solid pink;" contenteditable="true"></div>
    <HuFooterToolbar>
      <template v-slot:left>
        <a-button>返回</a-button>
      </template>
      <a-button type="primary">提交</a-button>
    </HuFooterToolbar>
  </div>
</template>

<script>
import HuFooterToolbar from '@/components/FooterToolbar/FooterToolbar.vue'
export default {
  name: 'Article',
  components: {
    HuFooterToolbar
  }
};
</script>

<style scoped>
</style>
