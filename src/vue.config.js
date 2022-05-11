// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
//   }

const vueConfig = {
    publicPath: process.evn.VUE_PUBLIC_PATH || '/',
    productionSourceMap: false,
    /** 这种方式设置主题没有生效，未生效原因还没有找到 */
    // css: {
    //     loaderOptions: {
    //         less: {
    //             modifyVars: {
    //                 'primary-color': '#1d67c7',
    //             },
    //             javascriptEnabled: true,
    //         },
    //     },
    // },
    // 跨域配置
    devServer: {
        open: true, // 浏览器自动打开页面
        host: 'localhost', // 如果是真机测试，就使用这个IP
        port: 8080,
        https: false,
        hotOnly: false, // 热更新（webpack已实现了，这里false即可）
        proxy: {
            // 配置跨域-将所有/api的请求拦截，代理到target上
            '/product/api': { // 注意：axios.defaults.baseURL的值要配置成代理的值 baseURL: `/product/api`
                target: 'http://www.youngday.top',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}

module.exports = vueConfig