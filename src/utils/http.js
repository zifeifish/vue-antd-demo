import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import notification from 'ant-design-vue/es/notification'
import messsage from 'ant-design-vue/es/message'

const CODEMESSAGE = {
    200: '请求成功，服务器成功返回数据',
    201: '成功请求并创建了新的资源',
    202: '服务器已经接受请求，但未处理完成',
    204: '服务器成功处理，但未返回内容',
    400: '客户端请求的语法错误，服务器无法理解',
    401: '用户没有权限，请求要求用户的身份认证',
    403: '服务器理解请求客户端的请求，但是访问是被禁止的。',
    404: '服务器无法根据客户端的请求找到资源（网页）',
    406: '服务器无法根据客户端请求的内容特性完成请求',
    410: '客户端请求的资源已经不存在',
    422: '从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};
const service = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    // baseURL: `${location.origin}/${process.env.VUE_APP_API_BASE_URL}`, // api base_url
    // baseURL: `http://10.10.20.31:8888`, // api base_url
    baseURL: `/product/api`, // api base_url
    timeout: 60000,
});

// 错误码处理
const httpErr = (error) => {
    if (error.response) {
        const data = error.response.data
        const status = error.response.status
        let errMsg = '请求错误'
        const token = Vue.ls.get(ACCESS_TOKEN)
        switch (status) {
            case 202:
                errMsg = data.message | CODEMESSAGE[202]
                break;
            case 204:
                errMsg = data.message | CODEMESSAGE[204]
                break;
            case 400:
                errMsg = data.message | CODEMESSAGE[400]
                break;
            case 401:
                errMsg = data.message | CODEMESSAGE[401]
                if (token) {
                    store.dispatch('Logout').then(() => {
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    })
                }
                break;
            case 403:
                errMsg = data.message | CODEMESSAGE[403]
                break;
            case 404:
                errMsg = data.message | CODEMESSAGE[404]
                break;
            case 406:
                errMsg = data.message | CODEMESSAGE[406]
                break;
            case 410:
                errMsg = data.message | CODEMESSAGE[410]
                break;
            case 422:
                errMsg = data.message | CODEMESSAGE[422]
                break;
            case 500:
                errMsg = data.message | CODEMESSAGE[500]
                break;
            case 502:
                errMsg = data.message | CODEMESSAGE[502]
                break;
            case 504:
                errMsg = data.message | CODEMESSAGE[504]
                break;

            default:
                errMsg = data.message | '未知错误'
                break;
        }
        if (errMsg) {
            notification.error({
                message: '请求失败',
                description: errMsg,
            })
        }
    }
    return Promise.reject(error)
}

// resquest interceptor 
axios.interceptors.request.use(config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
        config.headers['Access-Token'] = token
    }
    return config
}, httpErr)

// response interceptor 
axios.interceptors.response.use(response => {
    const { code, message } = response.data

    if (code === 20005 || code === 20002) {
        // codeErr(code)
        return Promise.reject(message)
    }
    if (code !== 20000) {
        messsage.error(message)
        return Promise.reject(message)
    }
    return response.data
}, httpErr)

export { service as axios }