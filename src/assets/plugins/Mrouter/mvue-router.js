import Vue from 'vue';
import Link from './mrouter-link'
import View from './mrouter-view'

// let Vue;

// 实现一个插件：挂载$router
class MVueRouter {

    constructor(options) {
        // 把options通过$options暴露出去 方便外部使用this.$router.$options
        this.$options = options;

        // 设置一个响应式的current属性
        // Vue.util.defineReactive: 定义一个对象的响应属性
        /**
         * Vue.util.defineReactive(obj,key,value,fn)
                obj: 目标对象，
                key: 目标对象属性；
                value: 属性值
                fn: 只在node调试环境下set时调用
         */
        Vue.util.defineReactive(this, 'current', '/')

        // 监听hashchange事件
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        // 加载的时候也执行一下
        window.addEventListener('load', this.onHashChange.bind(this))
        
    }

    onHashChange() {
        // 截取出#后面的path
        this.current = window.location.hash.slice(1)
    }
}

MVueRouter.install = function(_vue) {
    let Vue = _vue
    // 挂载$router
    // 怎么获取根实例中获取router选项
    // 利用全局或如，在beforCreate钩子里面获取选项
    Vue.mixin({
        // router只有在根实例中存在
        beforeCreate () {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 声明两个全局组件
    Vue.component('mrouter-link', Link)
    Vue.component('mrouter-view', View)

}

export default MVueRouter