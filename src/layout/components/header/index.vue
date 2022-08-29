<script setup>
import MenuCollaose from './components/MenuCollapse.vue'
import BreadCrumb from './components/BreadCrumb.vue' /* 面包屑 */
</script>

<template>
  <header class="header">
    <div class="h-left">
      <MenuCollaose />
      <BreadCrumb />
      <div>left</div>
    </div>
    <div class="h-right">
      <div>right</div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .h-left,
  .h-right {
    display: flex;
    align-items: center;
  }
}
</style>
