<script setup>
import { router } from '@/router'
const { currentRoute } = router
function handleBreadClike(path) {
  /* 点击面包屑事件 */
  if (path === currentRoute.value.path) return
  router.push(path)
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item of currentRoute.matched" :key="item.path" @click="handleBreadClike(item.path)">
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
