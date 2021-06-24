<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="接收邮箱">
                <a-input placeholder="请输入..." v-model="querParams.mail" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="接收人姓名">
                <a-input
                  placeholder="请输入..."
                  v-model="querParams.useName"
                ></a-input>
              </a-form-item>
            </a-col>
            <template v-if="isExpand">
              <a-col :md="8" :sm="24">
                <a-form-item label="信息类型">
                  <a-input
                    placeholder="请输入..."
                    v-model="querParams.messageType"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发送内容">
                  <a-input
                    placeholder="请输入..."
                    v-model="querParams.sendContent"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发送时间">
                  <a-range-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    style="width: 100%"
                    v-model="querParams.sendTime"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                  </a-range-picker>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发送结果">
                  <a-select
                    placeholder="请选择"
                    v-model="querParams.sendResult"
                  >
                    <a-select-option value="1">成功</a-select-option>
                    <a-select-option value="0">失败</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发送渠道">
                  <a-input
                    placeholder="请输入..."
                    v-model="querParams.sendChannel"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发送请求来源">
                  <a-input
                    placeholder="请输入来源、人也、业务"
                    v-model="querParams.sendSource"
                  ></a-input>
                </a-form-item>
              </a-col>
            </template>
            <template>
              <a-col
                style="text-align: right"
                :md="isExpand ? '24' : '8'"
                :sm="8"
              >
                <span>
                  <a-button type="primary" @click="onSearch()">查询</a-button>
                  <a-button
                    type="default"
                    style="margin: 0 8px"
                    @click="onRest()"
                    >重置</a-button
                  >
                  <a href="javaScript: void(0)" @click="isExpand = !isExpand">
                    {{ isExpand ? "收起" : "展开" }}
                    <a-icon :type="isExpand ? 'up' : 'down'" />
                  </a>
                </span>
              </a-col>
            </template>
          </a-row>
        </a-form>
      </div>

      <a-divider :dashed="true"></a-divider>

      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="tableData"
        :row-selection="rowSelection"
        :pagination="pagination"
        :scroll="{ x: 2500, y: 400 }"
        row-key="id"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="messageType" slot-scope="text">
          {{ text | formateSelectOptionFilter("messageType") }}
        </span>
        <span
          slot="quoteCount"
          slot-scope="text"
          :style="{ color: text ? '#1890ff' : '' }"
        >
          {{ text ? "是" : "否" }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-popconfirm
              title="您确定要重发吗？"
              @confirm="delIndicator(record)"
            >
              <a-icon slot="icon" type="close-circle" style="color: #f04134" />
              <a>重发</a>
            </a-popconfirm>
          </template>
        </span>
        <span slot="message" slot-scope="text">
          <template v-if="text">
            <a-tooltip>
              <template slot="title">{{ text }}</template>
              <a>
                {{ text.substr(0, 15) }}
                <span v-if="text.length > 15">...</span>
              </a>
            </a-tooltip>
          </template>
          <template v-else>
            <span>{{ text }}</span>
          </template>
        </span>
        <span slot="file">
          <a @click="fileViewVisible = true">附件</a>
        </span>
      </a-table>

      <span style="display: block; margin-top: -45px">
        <a-icon type="info-circle" style="color: #1890ff" />
        <span>
          邮件发送总量
          <span style="color: #1890ff">1,200,000</span>
          <a-divider type="vertical" />成功数量
          <span style="color: #1890ff">300,000</span>
          <a-divider type="vertical" />失败数量
          <span style="color: #1890ff">900,000</span>
          <a-divider type="vertical" />
        </span>
      </span>
    </a-card>

    <a-card style="margin-top: 20px" :bordered="false">
      <line-chart
        :chartData="chartData"
        chartTitle="邮件发送量折线图"
      ></line-chart>
    </a-card>

    <file-view-modal
      v-if="fileViewVisible"
      ref="viewModal"
      :visible.sync="fileViewVisible"
      @action="closeModal"
    ></file-view-modal>
    
  </div>
</template>

<script>
import LineChart from "@/components/LineChart/LineChart.vue";
import { paginationMixins } from "@/mixins/index";
import FileViewModal from "@/components/FileViewModal/index.vue";
export default {
  namr: "Mail",
  components: { LineChart, FileViewModal },
  mixins: [paginationMixins],
  data() {
    return {
      fileViewVisible: false,
      querParams: {},
      // 展开/收起
      isExpand: false,
      // 结束时间框
      endOpen: false,
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
          title: "接收邮箱",
          dataIndex: "mail",
        },
        {
          title: "接收人名称",
          dataIndex: "toNames",
        },
        {
          title: "信息类型",
          dataIndex: "messageType",
          scopedSlots: { customRender: "messageType" },
        },
        {
          title: "发送内容",
          dataIndex: "message",
          scopedSlots: { customRender: "message" },
        },
        {
          title: "发送附件",
          dataIndex: "file",
          scopedSlots: { customRender: "file" },
        },
        {
          title: "发送结果",
          dataIndex: "result",
          scopedSlots: { customRender: "result" },
        },
        {
          title: "发送时间",
          dataIndex: "gmtCreate",
          scopedSlots: { customRender: "time" },
        },
        {
          title: "渠道返回备注",
          dataIndex: "gmtCreatett",
        },
        {
          title: "发送渠道",
          dataIndex: "gmtModified",
        },
        {
          title: "发送请求来源",
          dataIndex: "smsSourceCode",
        },
        {
          title: "发送请求人员",
          dataIndex: "sender",
        },
        {
          title: "发送请求涉及业务",
          dataIndex: "relatedBusiness",
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
      // chartData
      chartData: [],
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
  watch: {
    currentPage: "getList",
    currentPageSize: "getList",
  },
  created() {
    this.getList();
  },
  methods: {
    closeModal(e) {
      console.log(e);
      console.log(this.$refs.viewModal);
      // this.$refs.viewModal.$destroy()
    },
    /**
     * getList
     * @param
     */
    getList() {
      this.loading = true;
      const chartData = [
        {
          date: "2018年8月",
          type: "成功",
          value: 30,
        },
        {
          date: "2018年8月",
          type: "失败",
          value: 13,
        },
        {
          date: "2018年9月",
          type: "成功",
          value: 61,
        },
        {
          date: "2018年9月",
          type: "失败",
          value: 16,
        },
        {
          date: "2018年10月",
          type: "成功",
          value: 58,
        },
        {
          date: "2018年10月",
          type: "失败",
          value: 96,
        },
        {
          date: "2018年11月",
          type: "成功",
          value: 268,
        },
        {
          date: "2018年11月",
          type: "失败",
          value: 42,
        },
        {
          date: "2018年12月",
          type: "成功",
          value: 11,
        },
        {
          date: "2018年12月",
          type: "失败",
          value: 81,
        },
        {
          date: "2019年1月",
          type: "成功",
          value: 190,
        },
        {
          date: "2019年1月",
          type: "失败",
          value: 8,
        },
        {
          date: "2019年2月",
          type: "成功",
          value: 51,
        },
        {
          date: "2019年2月",
          type: "失败",
          value: 63,
        },
        {
          date: "2019年3月",
          type: "成功",
          value: 28,
        },
        {
          date: "2019年3月",
          type: "失败",
          value: 27,
        },
        {
          date: "2019年4月",
          type: "成功",
          value: 88,
        },
        {
          date: "2019年4月",
          type: "失败",
          value: 256,
        },
        {
          date: "2019年5月",
          type: "成功",
          value: 306,
        },
        {
          date: "2019年5月",
          type: "失败",
          value: 78,
        },
        {
          date: "2019年6月",
          type: "成功",
          value: 57,
        },
        {
          date: "2019年6月",
          type: "失败",
          value: 11,
        },
        {
          date: "2019年7月",
          type: "成功",
          value: 18,
        },
        {
          date: "2019年7月",
          type: "失败",
          value: 48,
        },
        {
          date: "2019年8月",
          type: "成功",
          value: 16,
        },
        {
          date: "2019年8月",
          type: "失败",
          value: 91,
        },
        {
          date: "2019年9月",
          type: "成功",
          value: 46,
        },
        {
          date: "2019年9月",
          type: "失败",
          value: 19,
        },
        {
          date: "2019年10月",
          type: "成功",
          value: 52,
        },
        {
          date: "2019年10月",
          type: "失败",
          value: 89,
        },
        {
          date: "2019年11月",
          type: "成功",
          value: 43,
        },
        {
          date: "2019年11月",
          type: "失败",
          value: 47,
        },
        {
          date: "2019年12月",
          type: "成功",
          value: 80,
        },
        {
          date: "2019年12月",
          type: "失败",
          value: 45,
        },
        {
          date: "2020年1月",
          type: "成功",
          value: 80,
        },
        {
          date: "2020年1月",
          type: "失败",
          value: 120,
        },
        {
          date: "2020年2月",
          type: "成功",
          value: 280,
        },
        {
          date: "2020年2月",
          type: "失败",
          value: 95,
        },
        {
          date: "2020年3月",
          type: "成功",
          value: 200,
        },
        {
          date: "2020年3月",
          type: "失败",
          value: 153,
        },
        {
          date: "2020年4月",
          type: "成功",
          value: 90,
        },
        {
          date: "2020年4月",
          type: "失败",
          value: 50,
        },
        {
          date: "2020年5月",
          type: "成功",
          value: 65,
        },
        {
          date: "2020年5月",
          type: "失败",
          value: 34,
        },
        {
          date: "2020年6月",
          type: "成功",
          value: 90,
        },
        {
          date: "2020年6月",
          type: "失败",
          value: 135,
        },
        {
          date: "2020年7月",
          type: "成功",
          value: 80,
        },
        {
          date: "2020年7月",
          type: "失败",
          value: 190,
        },
      ];
      setTimeout(() => {
        this.loading = false;
        this.chartData = [...chartData];
        this.tableData = [
          { messageType: 1 },
          { messageType: 2 },
          { messageType: 9 },
          { messageType: 0 },
        ];
      }, 1000);

      // const query = {
      //   ...this.queryParam,
      //   pageSize: this.currentPageSize,
      //   pageNumber: this.currentPage,
      // };
      //  getSmsRecord(query)
      //   .then((res) => {
      //     this.loading = false;
      //     this.tableData = res.data.list;
      // this.pagination.total = res.data.count;
      //   })
      //   .catch((err) => {
      //     this.loading = false;
      //     this.tableData = [
      //       { messageType: 1 },
      //       { messageType: 2 },
      //       { messageType: 9 },
      //       { messageType: 0 },
      //     ];
      //     this.$notification.error({ message: `短信记录加载失败: ${err}！` });
      //   });
    },
    /**
     * 查询
     */
    onSearch() {
      console.log(this.querParams);
    },

    /**
     * 重置
     */
    onRest() {
      this.querParams = {};
      console.log(this.querParams);
    },
  },
};
</script>

<style lang="less" scoped>
</style>