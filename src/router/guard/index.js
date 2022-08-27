import { createPageLoadingGuard } from './page-loading-gurad'
import { createPageTitleGuard } from './page-title-guard'
import { createPermissionGuard } from './permission-guard'

export function setupRouterGuard(router) {
  createPageLoadingGuard(router)
  createPageTitleGuard(router)
  createPermissionGuard(router)
}
