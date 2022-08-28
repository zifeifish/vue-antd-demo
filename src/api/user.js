import { axios } from '@/utils/http'

export function getUserInfo({ loading, data}) {
  return axios({
    url: '/sms/user/info',
    method: 'post',
    loading,
    data,
  })
}

export function getJson({ loading }) {
  return axios({
    url: '/a.json',
    method: 'get',
    loading,
  })
}

export function getDog({ loading }) {
  return axios({
    url: 'https://dog.ceo/api/breeds/image/random',
    method: 'get',
    loading,
  })
}