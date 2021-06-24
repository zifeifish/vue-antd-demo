import { axios } from '@/utils/http'

export function getUserInfo() {
  return axios({
    url: '/sms/user/info',
    method: 'post',
  })
}