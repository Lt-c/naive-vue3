import { defAxios as request } from '@/utils/http'

export const login = (data) =>
  request({
    url: '/auth/login',
    method: 'post',
    data,
  })

export const refreshToken = () =>
  request({
    url: '/auth/refreshToken',
    method: 'post',
  })
