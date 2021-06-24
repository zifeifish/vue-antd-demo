<template>
  <div>
    <a-card :bordered="false">
      <a-descriptions title="短信设置" bordered>
      </a-descriptions>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :scroll="{ x: 2500, y: 400 }"
        row-key="id"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="evn" slot-scope="text">
          {{ text | formateSelectOptionFilter("evnType") }}
        </span>
        <span slot="smsStatus" slot-scope="text, record">
          <a-switch
            checked-children="真实短信"
            un-checked-children="虚拟短信"
            :default-checked="text === 1"
            @click="onStatusChange($event, record)"
          />
        </span>
        <span
          :style="{ color: text === 1 ? '#1890ff' : '#ff0000' }"
          slot="status"
          slot-scope="text"
        >
          {{ text | formateSelectOptionFilter("useStatus") }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-switch
              checked-children="开启"
              un-checked-children="关闭"
              default-checked
              @change="onStatusChange($event, record)"
            />
          </template>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { paginationMixins } from "@/mixins/index";
export default {
  name: "messageSet",
  mixins: [paginationMixins],
  data() {
    return {
      tableData: [], // 数据源
      loading: false, // loading
      // 表头
      columns: [
        {
          title: "序号",
          dataIndex: "serial",
          scopedSlots: { customRender: "serial" },
          width: 60,
          fixed: "left",
        },
        {
          title: "消息来源",
          dataIndex: "sourceName",
        },
        {
          title: "所处环境", // 0-开发 1-测试 2-生产
          dataIndex: "evn",
          scopedSlots: { customRender: "evn" },
        },
        {
          title: "模拟接收手机号",
          dataIndex: "phoneNumber",
        },
        {
          title: "模拟接收邮件地址",
          dataIndex: "mailAddress",
        },
        {
          title: "短信状态", // 0-虚拟短信 1-真实短信
          dataIndex: "smsStatus",
          scopedSlots: { customRender: "smsStatus" },
        },
        {
          title: "最后更新人",
          dataIndex: "modifier",
        },
        {
          title: "最后更新时间",
          dataIndex: "modifierTime",
        },
        {
          title: "状态", // 0-关闭 1-开启 9-删除
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" },
        },
      ],
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      };
    },
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    /** getList
     * @param
     */
    getList() {
      this.loading = true;
      const data = [
        {
          id: 1,
          sourceName: "链融科技平台",
          evn: 0,
          phoneNumber: "188 2024 8184",
          mailAddress: "www.lrscft@163.com",
          smsStatus: 1,
          mailStatus: 0,
          modifier: "娃哈哈",
          modifierTime: "2020-07-10  10:32:12",
          status: 1,
        },
        {
          id: 2,
          sourceName: "链融科技智能合同平台",
          evn: 1,
          phoneNumber: "188 2024 8184",
          mailAddress: "www.lrscft@163.com",
          smsStatus: 0,
          mailStatus: 1,
          modifier: "娃哈哈",
          modifierTime: "2020-07-10  10:32:12",
          status: 0,
        },
        {
          id: 3,
          sourceName: "链融科技保理云平台",
          evn: 2,
          phoneNumber: "188 2024 8184",
          mailAddress: "www.lrscft@163.com",
          smsStatus: 1,
          mailStatus: 1,
          modifier: "娃哈哈",
          modifierTime: "2020-07-10  10:32:12",
          status: 1,
        },
      ];
      this.tableData = data;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      // const query = { ...this.queryParam }
      // return getIndicatorList(query).then(res => {
      //   this.loading = false
      //   this.tableData = res.data.list
      // }).catch((err) => {
      //   this.loading = false
      //   this.$notification.error({ message: `指标列表加载失败: ${err}！` })
      // })
    },

    /** onStatusChange 修改设置状态
     * @param record 设置信息
     */
    onStatusChange(e, record) {
      console.log(e);
      console.log(record);
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },

    /** 清空选择项
     * @param
     */
    cleanSelectItem() {
      this.selectedRowKeys = [];
      this.selectedRows = [];
    },
  },
};
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  margin: 0 24px;
}
.head-btn {
  margin: 24px;
}
</style>