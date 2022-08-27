import { useUserStore } from '@/store/modules/user'

const WITHOUT_TOKEN_API = [{ url: '/auth/login', method: 'post' }]
/* 判断请求路径，方式*/
export function isWithoutToken({ url, method = '' }) {
  return WITHOUT_TOKEN_API.some((item) => item.url === url && item.method === method.toLowerCase())
}
// 判断是否有userid
export function addBaseParams(params) {
  if (!params) {
    params.userId = useUserStore().userId
  }
}
