import LAYOUT from '@/layout/index.vue'

export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },
  {
    name: 'Dashboard',
    path: '/',
    component: LAYOUT,
    redirect: '/home',
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    name: 'Test',
    path: '/test',
    component: LAYOUT,
    redirect: '/test/unocss',
    meta: {
      title: '基础功能测试',
    },
    children: [
      {
        name: 'Unocss',
        path: 'unocss',
        component: () => import('@/views/test-page/unocss/index.vue'),
        meta: {
          title: '测试unocss',
        },
      },
      {
        name: 'Message',
        path: 'message',
        component: () => import('@/views/test-page/message/index.vue'),
        meta: {
          title: '测试Message',
        },
      },
      {
        name: 'TestKeepAlive',
        path: 'keep-alive',
        component: () => import('@/views/test-page/keep-alive/index.vue'),
        meta: {
          title: '测试Keep-Alive',
          keepAlive: true,
        },
      },
    ],
  },
]
// 没有权限进行访问会跳转到404
export const NOT_FONUD_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

// modules路径下的路由都作为动态路由
const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default)
})

export { asyncRoutes }
