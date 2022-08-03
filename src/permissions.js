import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setWaterMark, removeWatermark } from '../src/assets/plugins/watermark'
import Cookie from 'js-cookie'


NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.name !== 'login') {
        setWaterMark('哈哈哈', '177****9090')
        if (Cookie.get('skey')) {
            console.log(store.getters.token);
            next()
        } else {
            next({ path: '/user/login' })
        }
    } else {
        removeWatermark()
    }
    next()
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()

})
