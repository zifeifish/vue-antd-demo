// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
//   }

const vueConfig = {
    publicPath: process.evn.VUE_PUBLIC_PATH || '/',
    productionSourceMap: false,
    devServer: {
        hot: true,
        open: true,
        port: 8080,
        host: "127.0.0.1"
    }
}

module.exports = vueConfig