// 路由跳转载入条
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    window.$loadingBar?.start()
  })

  router.afterEach((to, from) => {
    // to and from are both route objects.
    setTimeout(() => {
      window.$loadingBar?.finish()
    })
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
