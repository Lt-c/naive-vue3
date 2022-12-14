<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { renderIcon } from '@/utils/icon'

import { isExternal } from '@/utils/is'

const router = useRouter()
const { currentRoute } = router

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const menuOptions = computed(() => {
  return permissionStore.menus.map((item) => getMenuItem(item))
})

/* MenuOption[] 需要这样的类型 */
const getMenuItem = (route, basePath = '') => {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name /* 用户名称 */,
    key: route.name,
    icon: route.meta?.icon ? renderIcon(route.meta?.icon, { size: 18 }) : renderIcon('', { size: 12 }),
    // children
    path: resolvePath(basePath, route.path),
  }
  /* 判断是否有子路由 */
  const visibleChildren = route.children ? route.children.filter((item) => item.name && !item.isHidden) : []

  /* 无子路由时 */
  if (!visibleChildren.length) return menuItem

  /* 单个子路由 */
  if (visibleChildren.length === 1) {
    const singleRoute = visibleChildren[0]
    menuItem = {
      label: (singleRoute.meta && singleRoute.meta.title) || singleRoute.name /* 用户名称 */,
      key: singleRoute.name,
      icon: singleRoute.meta?.icon ? renderIcon(singleRoute.meta?.icon, { size: 16 }) : renderIcon('', { size: 12 }),
      // children
      path: resolvePath(basePath, singleRoute.path),
    }
    /* 判断是否有子路由 */
    const visibleItems = singleRoute.children ? singleRoute.children.filter((item) => item.name && !item.isHidden) : []
    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path)
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems.map((item) => getMenuItem(item, menuItem.path))
    }
  } else {
    /* 多个子路由 */
    menuItem.children = visibleChildren.map((item) => getMenuItem(item, menuItem.path))
  }
  return menuItem
}
/* 处理按钮路径 */
const resolvePath = (basePath, path) => {
  /* 判断是否为外链 */
  if (isExternal(path)) return path
  return (
    '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/') /* 非空且不为 / */
      .map((path) => path.replace(/(^\/)|(\/$)/g, '')) /* 取出// */
      .join('/')
  )
}
/* 点击事件 */
const handleMenuSelect = (key, item) => {
  /* 外链 则打开新标签 */
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    if (item.path === currentRoute.value.path && !currentRoute.value.meta?.keepAlive) {
      appStore.reloadPage()
    } else {
      router.push(item.path)
    }
  }
}
</script>

<template>
  <n-menu
    class="side-menu"
    accordion
    :indent="18"
    :root-indent="18"
    :collapsed-width="64"
    :options="menuOptions"
    :value="(currentRoute.meta && currentRoute.meta.activeMenu) || currentRoute.name"
    @update:value="handleMenuSelect"
  />
</template>
<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid $primaryColor;
      }
    }
  }
}
</style>
