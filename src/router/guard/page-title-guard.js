const baseTitle = import.meta.env.VITE_APP_TITLE
// 设置网页title
export function createPageTitleGuard(router) {
  router.afterEach((to) => {
    // to and from are both route objects.
    const pageTitle = to.meta?.title
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`
    } else {
      document.title = baseTitle
    }
  })
}
