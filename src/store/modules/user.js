// import { getUserInfo } from '@/api/user'
const user = {
    state: {
        token: '',
        avatar: require('@/assets/images/avatar.png'),
        roles: [],
        info: {},
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        },
    },
    actions: {
        // 获取用户信息
        Login({ commit }) {
            return new Promise((resolve) => {
                // getUserInfo().then(res => {
                // console.log('getInfo :', res)
                // commit('SET_INFO', res.data)
                
                commit('SET_TOKEN', '03b21341018ecae9de9b905bb486094e2337')
                resolve({ message: '登录成功！' })
                // }).cath(error => {
                //     reject(error)
                // })
            })
        },

        // 登出
        Logout({ commit }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_INFO', {})
                resolve()
            })
        },
    }
}
export default user