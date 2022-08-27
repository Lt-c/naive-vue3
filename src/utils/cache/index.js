import { createStorage } from './storage'

const prefixKey = 'VUE_Naive_Admin'

export const createLoaclStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  })
}

export const createSessionStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLoaclStorage({ prefixKey })

export const sStorage = createSessionStorage({ prefixKey })
