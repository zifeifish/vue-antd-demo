<template>
  <div>
    <a-card title="图片压缩测试">
      <div>
        <a-upload :beforeUpload="beforeUpload">
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </div>
      <div style="display: flex">
        <div style="margin-top: 30px">
          <p v-if="oldFileSize">
            <b>文件压缩前尺寸:</b> {{ Math.floor(oldFileSize / 1024) }} kb
          </p>
          <img
            style="max-width: 400px; margin-right: 10px"
            :src="oldFileUrl"
            alt="压缩前"
          />
        </div>
        <div style="margin-top: 30px">
          <p v-if="compressSize">
            <b>文件压缩后尺寸:</b> {{ Math.floor(compressSize / 1024) }} kb
          </p>
          <img style="max-width: 400px" :src="compressUrl" alt="压缩后" />
        </div>
      </div>
      <a-button type="primary" @click="openLoadig()">
        open loading close after 3s
      </a-button>
    </a-card>
  </div>
</template>
<script>
import { getJson, getDog } from "@/api/user";
export default {
  name: "CompressImage",
  components: {},
  data() {
    return {
      oldFileUrl: "",
      oldFileSize: 0,
      compressUrl: "",
      compressSize: 0,
    };
  },
  methods: {
    beforeUpload(file) {
      console.log("压缩前的file----------", file);
      let that = this;
      this.oldFileUrl = window.URL.createObjectURL(file);
      this.oldFileSize = file.size;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend (en-US) 事件，
        // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
        reader.readAsDataURL(file);
        reader.onload = () => {
          const canvas = document.createElement("canvas");
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const w = img.width;
            const h = img.height;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 在Canvas上绘制图像
            ctx.drawImage(img, 0, 0, w, h);

            // 返回一个包含图片展示的 data URI base64
            // 在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            that.compressUrl = dataUrl;

            // base64格式文件转成Blob文件格式
            const blobFile = that.dataURLtoBlob(dataUrl);
            that.compressSize = blobFile.size;
            console.log("压缩后的file----------", blobFile);
          };
        };
        // resolve()
        reject();
      });
    },

    // canvas生成的格式为base64，需要进行转化
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    openLoadig() {
      const params = {
        loading: true,
        data: {},
      };
      getJson(params)
        .then((res) => {
          console.log(11, res);
        })
        .catch((err) => {
          console.log(22, err);
        });
      getDog(params)
        .then((res) => {
          console.log(12, res);
        })
        .catch((err) => {
          console.log(23, err);
        });
      // this.$loading.open("正在加载中...");
      // setTimeout(() => {
      //   this.$loading.close();
      // }, 3000);
    },
  },
};
</script>
<style lang="less"></style>
