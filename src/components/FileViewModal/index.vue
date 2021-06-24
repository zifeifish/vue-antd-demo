<template>
  <a-modal
    title="查看"
    :visible="visible"
    :destroy-on-close="true"
    @ok="formSubmit"
    @cancel="formCancel"
    :keyboard="false"
    :mask-closable="false"
    width="70%"
  >
    <a-spin :spinning="spinning">
      <div
        style="
          box-sizing: border-box;
          max-height: 600px;
          overflow-x: hidden;
          overflow-y: scroll;
          padding: 20px;
          background-color: #bbb;
        "
      >
        <pdf :src="url" :page="currentPage"></pdf>
      </div>
      <div style="margin-top: 10px; text-align: right">
        <a-pagination
          v-model="currentPage"
          :defaultPageSize="1"
          show-quick-jumper
          :total="numPages"
          :show-total="(total) => `共 ${total} 页`"
        />
      </div>
    </a-spin>
  </a-modal>
</template>
<script>
import { ModalMixins } from "@/mixins";
import pdf from "vue-pdf";
export default {
  name: "FileViewModal",
  components: { pdf },
  mixins: [ModalMixins],
  props: {},
  watch: {
    visible: {
      handler: function () {
        let that = this;
        this.url = pdf.createLoadingTask(that.onlinePath);
      },
      immediate: true,
    },
  },
  computed: {},
  created() {
    console.log("pppp");
  },
  mounted() {
    console.log("pppp");
    this.getPages();
  },
  data() {
    return {
      spinning: false,
      loading: false, // loading
      url: null,
      currentPage: 1,
      // 总页数
      numPages: undefined,
      onlinePath:
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      filePath: `${window.location.origin}/公司简介_道乐科技有限公司2019.pdf`,
    };
  },
  methods: {
    getPages() {
      this.url.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    },

    /** 取消
     * @param
     */
    formCancel() {
      this.$emit("update:visible", false);
      this.$emit("action", { ok: false });
    },

    /** 确定
     * @param
     */
    formSubmit() {
      this.$emit("update:visible", false);
      this.$emit("action", { ok: true });
    },
  },
};
</script>
<style lang="less" scoped>
.table-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.quota-list {
  line-height: 2;
  cursor: pointer;
  margin: 4px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
