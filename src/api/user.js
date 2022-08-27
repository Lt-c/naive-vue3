import { defAxios as request } from '@/utils/http'

export const getUsers = (data = {}) => {
  return request({
    url: '/user',
    method: 'get',
    data,
  })
}
