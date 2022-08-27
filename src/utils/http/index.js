import axios from 'axios'

import { resResolve, resReject, reqResolve, reqReject } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options /* 后面会覆盖前 */,
  })
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(resResolve, resReject)
  return service
}

export const defAxios = createAxios()

export const testAxios = createAxios({
  baseURL: import.meta.env.VITE_APP_BASE_API_TEST,
})