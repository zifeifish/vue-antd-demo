import Loading from './Loading.vue'

let $vm

export default {
    // Vue.js 的插件应该暴露一个 install 方法。
    // 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
    install(Vue, options) {

        // Vue.use(plagin, options)
        console.log('LoadingPlugin options..........', options);
        if (!$vm) {
            // Vue.extend(Loading) 创建一个“子类”。
            const LoadingPlugin = Vue.extend(Loading);
            // 挂载loading组件实例
            $vm = new LoadingPlugin({
                el: document.createElement('div')
            });
            // 将loading组件追加到页面上
            document.body.appendChild($vm.$el);
        }
        $vm.show = false;
        let loading = {
            open(text) {
                $vm.show = true;
                $vm.text = text;
            },
            close() {
                $vm.show = false;
            }
        };
        if (!Vue.$loading) {
            Vue.$loading = loading;
        }

        // 全局混入的方式注入组件选项
        Vue.mixin({
            created() {
                this.$loading = Vue.$loading;
            }
        })
    }
}