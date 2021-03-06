<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col id="mobile" :md="8" :sm="24">
              <a-form-item label="接收手机号">
                <a-input
                  placeholder="请输入..."
                  v-model="querParams.phoneNumber"
                />
              </a-form-item>
            </a-col>
            <a-col id="name" :md="8" :sm="24">
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
                  <a-button id="search-dom" type="primary" @click="onSearch()"
                    >查询</a-button
                  >
                  <a-button
                    id="search-clear"
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
        id="table"
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
      </a-table>

      <span style="display: block; margin-top: -45px">
        <a-icon type="info-circle" style="color: #1890ff" />
        <span>
          短信发送总量
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
        chartTitle="短信发送量折线图"
      ></line-chart>
    </a-card>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart/LineChart.vue";
import { paginationMixins } from "@/mixins/index";
import Driver from "driver.js";
import { driverConfig } from "@/shared/index";
export default {
  name: "Message",
  components: { LineChart },
  mixins: [paginationMixins],
  data() {
    return {
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
          title: "接收手机号",
          dataIndex: "to",
        },
        {
          title: "接收人名称",
          dataIndex: "toNames",
        },
        {
          title: "消息类型",
          dataIndex: "messageType",
          scopedSlots: { customRender: "messageType" },
        },
        {
          title: "消息内容",
          dataIndex: "message",
          scopedSlots: { customRender: "message" },
        },
        {
          title: "消息发送状态",
          dataIndex: "messageStatus",
        },
        {
          title: "创建时间",
          dataIndex: "gmtCreate",
          scopedSlots: { customRender: "gmtCreate" },
        },
        {
          title: "修改时间",
          dataIndex: "gmtModified",
          scopedSlots: { customRender: "gmtModified" },
        },
        {
          title: "消息平台源",
          dataIndex: "smsSourceCode",
        },
        {
          title: "短信服务提供平台",
          dataIndex: "serviceProvider",
        },
        {
          title: "消息发送人",
          dataIndex: "sender",
        },
        {
          title: "关联业务",
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
  mounted() {
    const driver = new Driver({
      ...driverConfig,
    });
    driver.defineSteps([
      {
        element: "#mobile",
        popover: {
          title: "手机号",
          description: "在此处输入接收手机号",
          position: "bottom",
        },
      },
      {
        element: "#name",
        popover: {
          title: "命名",
          description: "输入接收人姓名",
          position: "bottom",
        },
      },
      {
        element: "#search-dom",
        popover: {
          title: "查询",
          description: "点击此处开始查询",
          position: "bottom",
        },
      },
      {
        element: "#table",
        popover: {
          title: "查询结果",
          description: "查询结果展示在这里",
          position: "bottom",
        },
      },
      {
        element: "#send-total",
        popover: {
          title: "查询发送量",
          description: "点击下拉框选择要查询的发送量",
          position: "bottom",
        },
      },
      {
        element: "#xnChart",
        popover: {
          title: "折线图",
          description: "短信发送量折线图",
          position: "bottom",
        },
      },
    ]);
    setTimeout(() => {
      driver.start();
    }, 0);
  },
  methods: {
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

<style lange="less" scoped>
.table-page-search-wrapper {
  margin: 0 24px;
}
</style>