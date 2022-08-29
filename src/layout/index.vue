<script setup>
import AppHeader from './components/header/index.vue'
import AppSider from './components/sider/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
</script>

<template>
  <n-layout has-sider h-full>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <AppSider />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <AppHeader></AppHeader>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <AppMain></AppMain>
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
