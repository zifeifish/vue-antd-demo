<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; justify-content: center">
        <div id="map-china" style="width: 1000px; height: 800px"></div>
      </div>
    </a-card>
  </div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
// 引入地图
// import "echarts/lib/chart/map";
// 引入js
import "echarts/map/js/china.js";
export default {
  name: "MapChina",
  data() {
    return {
      chinachart: null,
      chartOption: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  //   mounted() {
  //     // this.init();

  //   },
  mounted() {
    this.initMap();
  },

  methods: {
    init() {
      let myChart = echarts.init(this.$refs.echarts);
      let option = {
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          formatter(params) {
            let htmlStr = `
                          <div style='font-size:18px;'> ${params.name}</div>
                        `;
            return htmlStr;
          },
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: {
          map: "china",
          show: true,
          roam: true,
          top: 0,
          label: {
            emphasis: {
              show: false,
            },
          },
          // 地图的背景色
          itemStyle: {
            normal: {
              areaColor: "#091632",
              borderColor: "#9adcfa",
              shadowColor: "#09184F",
              shadowBlur: 20,
            },
          },
        },
        series: [
          // 地图部分
          {
            type: "map",
            map: "china",
            geoIndex: 1,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: true, // 存在legend时显示
            top: 0,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            //是否开启鼠标缩放和平移漫游
            roam: false,
            //默认样式
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "#0f2c70",
              },
            },
            data: [
              {
                name: "黑龙江",
                //自定义省的颜色
                itemStyle: {
                  normal: {
                    areaColor: "#F50508",
                    borderColor: "#1773c3", // 区域边框
                    shadowColor: "#1773c3", // 阴影
                    shadowBlur: 20,
                  },
                },
              },
            ],
            zlevel: 0,
          },
          // 气泡
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            //要有对应的经纬度才显示，先经度再维度
            data: [{ name: "哈尔滨", value: [126.63, 45.75] }],
            showEffectOn: "render",
            rippleEffect: {
              scale: 4, // 波纹的最大缩放比例
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                position: "right",
                fontWeight: 500,
                fontSize: 14,
              },
            },
            itemStyle: {
              normal: {
                color: "#32cd32",
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            emphasis: {
              itemStyle: {
                color: "#f4e925", // 高亮颜色
              },
            },
            zlevel: 1,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    initMap() {
      // 初始化echarts实例
      this.chinachart = echarts.init(document.getElementById("map-china"));
      // 进行相关配置
      this.chartOption = {
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
          // formatter(params, ticket, callback) {
          //     console.log(ticket,callback);
          //   // params.data 就是series配置项中的data数据遍历
          //   let localValue, perf, downloadSpeep, usability, point;
          //   if (params.data) {
          //     localValue = params.data.value;
          //     perf = params.data.perf;
          //     downloadSpeep = params.data.downloadSpeep;
          //     usability = params.data.usability;
          //     point = params.data.point;
          //   } else {
          //     // 为了防止没有定义数据的时候报错写的
          //     localValue = 0;
          //     perf = 0;
          //     downloadSpeep = 0;
          //     usability = 0;
          //     point = 0;
          //   }
          //   let htmlStr = `
          //   <div style='font-size:18px;'> ${params.name}</div>
          //   <p style='text-align:left;margin-top:-10px;'>
          //     区域对应数据value：${localValue}<br/>
          //     性能perf：${perf}<br/>
          //     下载速度downloadSpeep：${downloadSpeep}<br/>
          //     可用性usability：${usability}<br/>
          //     监测点数point：${point}<br/>
          //   </p>
          // `;
          //   return htmlStr;
          // },
          // backgroundColor:"#ff7f50",//提示标签背景颜色
          // textStyle:{color:"#fff"} //提示标签字体颜色
        },
        // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
        visualMap: {
          // 左下角的颜色区域
          type: "piecewise", // 定义为分段型 visualMap
          min: 0,
          max: 1000,
          itemWidth: 40,
          bottom: 10,
          left: 10,
          pieces: [
            // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，
            // 以及每一段的文字，以及每一段的特别的样式
            { gt: 999, label: ">1000人", color: "#82121b" }, // (1000, ]
            { gt: 100, lte: 999, label: "100-999人", color: "#bb2222" }, // (100, 999]
            { gt: 10, lte: 99, label: "10-99人", color: "#fe7b6c" }, // (10, 99]
            { gt: 0, lte: 9, label: "1-9人", color: "#ffaa85" }, // (0, 9]
          ],
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "china", // 表示中国地图
          // roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: true,
          },
          itemStyle: {
            // 地图区域的多边形 图形样式。
            borderColor: "rgba(0, 0, 0, 0.2)",
            emphasis: {
              // 高亮状态下的多边形和标签样式
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            name: "各区域人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            label: {
              show: true,
            },
            // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是定义的假数据）
            data: [
              { name: "湖南", value: 3957 },
              { name: "北京", value: 2665 },
              { name: "上海", value: 1647 },
              { name: "江西", value: 79 },
              { name: "河南", value: 1592 },
              { name: "山西", value: 80 },
              { name: "四川", value: 1399 },
              { name: "湖北", value: 1194 },
              { name: "江苏", value: 1162 },
              { name: "内蒙古", value: 1152 },
              { name: "安徽", value: 354 },
              { name: "辽宁", value: 719 },
              { name: "广东", value: 1697 },
              { name: "浙江", value: 602 },
              { name: "济南", value: 535 },
              { name: "陕西", value: 516 },
              { name: "贵州", value: 470 },
              { name: "山东", value: 429 },
              { name: "云南", value: 429 },
              { name: "广西", value: 421 },
              { name: "吉林", value: 400 },
              { name: "南京", value: 353 },
              { name: "重庆", value: 337 },
              { name: "黑龙江", value: 282 },
              { name: "海南", value: 7 },
              { name: "新疆", value: 279 },
              { name: "福建", value: 213 },
              { name: "河北", value: 192 },
              { name: "天津", value: 166 },
              { name: "宁夏", value: 3 },
              { name: "甘肃", value: 8 },
              { name: "青海", value: 11 },
              { name: "西藏", value: 2 },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示地图数据
      this.chinachart.setOption(this.chartOption);
    },
  },
};
</script>

<style lang="less" scoped>
.centent {
  width: 800px;
  height: 800px;
  margin-top: 100px;
}
</style>
