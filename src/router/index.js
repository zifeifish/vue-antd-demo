import Vue from 'vue'
// import VueRouter from 'vue-router'
import MVueRouter from '../assets/plugins/Mrouter/mvue-router'
import { routerConfig } from './router.config'

//解决vue路由重复导航错误
//获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
// //修改原型对象中的push方法
// // hack router push callback
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

// Vue.use(VueRouter)
Vue.use(MVueRouter)



export default new MVueRouter({
    // mode: 'history',
    // scrollBehavior: () => ({ y: 0 }),
    routes: routerConfig
})