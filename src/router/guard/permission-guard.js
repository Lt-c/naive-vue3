import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { getToken, removeToken, refreshAccessToken } from '@/utils/token'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import { isNullOrWhitespace } from '@/utils/is'
import { toLogin } from '@/utils/auth'

/* 不需要token的目录 */
const WHITE_LIST = ['/login']
export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  // console.log(permissionStore.generateRoutes);
  router.beforeEach(async (to, from) => {
    const token = getToken()

    /* 没有token的情况 */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true
      return { path: '/login', query: { ...to.query, redirect: to.path } }
    }

    /* 有token的情况 */
    if (to.path === '/login') return { path: '/', replace: true } // replace 替换当前位置

    /* 拿到用户信息 */
    if (userStore.userId) {
      refreshAccessToken()
      return true
    }

    await userStore.getUserInfo().catch((error) => {
      removeToken()
      toLogin()
      $message.error(error.message || '获取用户信息失败')
    })

    const accessRoutes = permissionStore.generateRoutes(userStore.role)
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.addRoute(NOT_FOUND_ROUTE)
    return { ...to, replace: true }
  })
}
