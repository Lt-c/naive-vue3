import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { getToken, removeToken, refreshAccessToken } from '@/utils/token'
import { NOT_FONUD_ROUTE } from '@/router/routes'

/* 不需要token的目录 */
const WHITE_LIST = ['/login', '/redirect']
export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  // console.log(permissionStore.generateRoutes);
  router.beforeEach(async (to, from, next) => {
    const token = getToken()

    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (userStore.userId) {
          // 已经拿到用户信息
          refreshAccessToken()
          next()
        } else {
          try {
            await userStore.getUserInfo()
            const accessRoutes = permissionStore.generateRoutes(userStore.role)
            // console.log(accessRoutes);
            accessRoutes.forEach((route) => {
              // 此路由是否有该名称，无则添加
              !router.hasRoute(route.name) && router.addRoute(route)
            })
            router.addRoute(NOT_FONUD_ROUTE)
            next({ ...to, replace: true })
          } catch (error) {
            removeToken()
            // toLogin()
            $message.error(error.message || '获取用户信息失败')
            next({ path: '/login', query: { ...to.query, redirect: to.path } })
          }
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login', query: { ...to.query, redirect: to.path } })
      }
    }
  })
}
