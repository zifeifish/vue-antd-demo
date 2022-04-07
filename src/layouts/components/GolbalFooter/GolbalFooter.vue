<template>
  <div>
    <div class="footer">
      <div class="links">
        <a href="#" target="_blank">葱姜蒜通知平台</a>
      </div>
      <div class="copyright">
        Copyright
        <a-icon type="copyright" /> 2021 <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GolbalFooter",
};
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>