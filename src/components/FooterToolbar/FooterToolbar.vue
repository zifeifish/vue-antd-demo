<template>
    <div class="hu-footer-bar" :style="{ paddingLeft: contentPaddingLeft }">
        <div style="flex: 1;">
            <slot name="left"></slot>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'HuFooterToolbar',
    computed: {
    ...mapState({
      contentPaddingLeft: state => state.app.sidebar ? '264px' : '104px',
    }),
  },
}
</script>
<style lang="less" scoped>
.hu-footer-bar {
    display: flex;
    position: fixed;
    align-items: center;
    height: 56px;
    line-height: 56px;
    border-top: 1px solid #f0f0f0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0 24px;
    background-color: #fff;
}
</style>