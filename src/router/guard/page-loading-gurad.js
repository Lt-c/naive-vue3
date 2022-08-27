// 路由跳转载入条
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    window.$naive.loadingBar?.start()
  })

  router.afterEach((to, from) => {
    // to and from are both route objects.
    setTimeout(() => {
      window.$naive.loadingBar?.finish()
    })
  })

  router.onError(() => {
    window.$naive.loadingBar?.error()
  })
}
