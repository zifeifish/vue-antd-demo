import UserLayout from '../layouts/UserLayout.vue'
import BaseLayout from '../layouts/BaseLayout.vue'
export const routerConfig = [
    {
        path: '/',
        redirect: '/user/login',
    },
    {
        path: '/user',
        name: 'user',
        component: UserLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/user/login/login.vue')
            }
        ]
    },
    {
        path: '/record',
        component: BaseLayout,
        name: 'record',
        meta: { title: '发送通知记录' },
        children: [
            {
                path: 'message',
                name: 'record-message',
                meta: { title: '短信记录' },
                component: () => import('@/views/record/message/list.vue')
            },
            {
                path: 'mail',
                name: 'record-send',
                meta: { title: '邮件记录' },
                component: () => import('@/views/record/mail/list.vue')
            }
        ]
    },
    {
        path: '/set',
        component: BaseLayout,
        name: 'set',
        meta: { title: '设置' },
        children: [
            {
                path: 'message',
                name: 'message-set',
                meta: { title: '信息设置' },
                component: () => import('@/views/set/message/message-set.vue')
            },
            {
                path: 'mail',
                name: 'mail-set',
                meta: { title: '邮件设置' },
                component: () => import('@/views/set/mail/mail-set.vue')
            },
        ]
    },
    {
        path: '/403',
        component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
    },
    {
        path: '/404',
        component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    },
    {
        path: '*',
        component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    },
]