<script setup>
import { router } from '@/router'
const { currentRoute } = router
import { IconDefault } from '@/components/AppIcons'
import { renderIcon } from '@/utils/icon'
function handleBreadClike(path) {
  /* 点击面包屑事件 */
  if (path === currentRoute.value.path) return
  router.push(path)
}
/*根据是否有icon图标，自定义 */
function getIcon(meta) {
  if (meta?.icon) return renderIcon(meta?.icon, { size: 18 })
  return renderIcon(IconDefault, { size: 18 })
}
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item of currentRoute.matched.filter((item) => !!item.meta?.title)"
      :key="item.path"
      @click="handleBreadClike(item.path)"
    >
      <component :is="getIcon(item.meta)"></component>
      {{ item?.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
