import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Watermark from 'watermark-package'
// import Watermark from '@/assets/plugins/watermark.js'
import Cookie from 'js-cookie'


NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.name !== 'login') {
        Watermark.setWaterMark(
            {
                w_texts: ['娃哈哈', '177****0000'],
            }
        )
        if (Cookie.get('skey')) {
            console.log(store.getters.token);
            next()
        } else {
            next({ path: '/user/login' })
        }
    } else {
        Watermark.removeWatermark()
    }
    next()
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()

})
