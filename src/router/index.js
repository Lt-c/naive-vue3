import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { setupRouterGuard } from './guard'

const isHash = import.meta.env.VITE_APP_USE_HASH === 'true'

export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: [] /* 路由表 */,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
/* 暂时未用 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    router.hasRoute(name) && router.removeRoute(name)
  })
  basicRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route)
  })
}

export function setupRouter(app) {
  basicRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route)
  })
  app.use(router)
  setupRouterGuard(router)
}
