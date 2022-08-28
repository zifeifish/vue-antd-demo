import Vue from 'vue'
import VueStorage from 'vue-ls'
import Cookie from 'js-cookie'
Cookie.set('skey', '03b21341018ecae9de9b905bb486094e2337')

// base libraly
import Antd from 'ant-design-vue'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import { Icon } from 'ant-design-vue'
// import '@/assets/iconfonts/iconfont.css'
import LoadingPlugin from '@/components/Loading/Loading.js'

Vue.use(Antd)

Vue.use(VueStorage, {
    namespace: 'lr__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'session', // storage name session, local, memory
})

Vue.use(LoadingPlugin, { loading: true})

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_2052613_kee3tubq4b.js',
// });
// Vue.component('IconFont', IconFont)

// Global notification config
notification.config({
    placement: 'bottomRight',
    bottom: '80px',
    duration: 3,
})