<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; justify-content: center">
        <div id="map-container" style="width: 1000px; height: 800px"></div>
      </div>
    </a-card>
  </div>
</template>

<script>
import loadBMap from "@/utils/bmap.js";
export default {
  name: "BaiduMap",
  data() {
    return {
      chinachart: null,
      chartOption: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const p = loadBMap(); // 加载引入BMap
    p.then(() => {
      this.initMap();
    });
  },

  methods: {
    initMap() {
      setTimeout(() => {
        const el = document.getElementById("map-container");
        //   var map = new BMapGL.Map("map-container"); // 创建地图实例
        const map = new window.BMap.Map(el); // 创建地图实例
        const point = new window.BMap.Point(114.071377, 22.547984); // 创建点坐标
        const marker = new window.BMap.Marker(point, { title: "民生金融大厦" }); // 添加标志
        const label = new window.BMap.Label("民生金融大厦", {
          position: point,
          offset: new window.BMap.Size(-48, -52),
        });
        label.setStyle({
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          maxWidth: "none",
          padding: "4px 10px",
        });
        map.addOverlay(label);
        map.centerAndZoom(point, 17); // 初始化地图，设置中心点坐标和地图级别
        map.addOverlay(marker);
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        console.log(6666, map);
      }, 0);
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
