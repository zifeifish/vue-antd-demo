<template>
  <div>
    <a-select
      style="min-width: 150px; margin-left: 25px"
      :allow-clear="true"
      placeholder="发送量"
      @change="handleChange"
    >
      <a-select-option value="">全部</a-select-option>
      <a-select-option value="10">10</a-select-option>
      <a-select-option value="20">20</a-select-option>
      <a-select-option value="30">50</a-select-option>
      <a-select-option value="50">80</a-select-option>
      <a-select-option value="100">100</a-select-option>
    </a-select>

    <div id="xnChart"></div>
  </div>
</template>

<script>
import { Line } from "@antv/g2plot";
export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    chartTitle: {
      type: String,
      default: "统计折线图",
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.$nextTick(() => {
          this.linePlot.changeData(this.chartData);
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      linePlot: null,
    };
  },
  mounted() {
    this.chartRender();
  },
  methods: {
    /**
     * 渲染折线图
     */
    chartRender() {
      this.linePlot = new Line(document.getElementById("xnChart"), {
        title: {
          visible: true,
          text: this.chartTitle,
        },
        description: {
          visible: true,
          text:
            "缩略轴 (slider) 交互适用于折线数据较多，可以移动时间栏，用来放大、缩小。最小统计维度为“日”。",
        },
        forceFit: true,
        padding: "auto",
        data: [...this.chartData],
        xField: "date",
        xAxis: {
          visible: true,
          label: {
            autoHide: true,
          },
        },
        yField: "value",
        yAxis: {
          label: {
            // 数值格式化为千分位
            formatter: (v) =>
              `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
        },
        legend: {
          position: "top-right",
          marker: {
            symbol: "circle",
            style: {
              r: 4,
            },
          },
        },
        tooltip: {
          visible: true,
          offset: 10,
          domStyles: {
            "g2-tooltip": {
              backgroundColor: "black",
              opacity: 0.8,
              color: "white",
            },
          },
        },
        seriesField: "type",
        responsive: true,
        interactions: [
          {
            type: "slider",
            cfg: {
              start: 0.2,
              end: 0.5,
            },
          },
        ],
      });
      this.linePlot.render();
    },

    /**
     * change chartData
     */
    handleChange(e) {
      let newData = [];
      if (!e) {
        newData = [...this.chartData];
      } else {
        newData = this.chartData.filter((x) => {
          return x.value > e;
        });
      }
      this.linePlot.changeData(newData);
    },
  },
};
</script>

<style>
</style>