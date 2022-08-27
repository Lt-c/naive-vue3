import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 把此文件夹下的所有js文件取出
const modules = import.meta.globEager('./modules/*.js')
const mockModules = []
Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
