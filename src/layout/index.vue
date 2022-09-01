<script setup>
import AppHeader from './components/header/index.vue'
import AppSider from './components/sider/index.vue'
import AppMain from './components/AppMain.vue'
import AppTags from './components/tags/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
const appStore = useAppStore()
const themeStore = useThemeStore()
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
      <n-layout-header
        bg-white
        px-15
        border-b
        bc-eee
        flex
        items-center
        :style="`height: ${themeStore.header.height}px`"
      >
        <AppHeader />
      </n-layout-header>
      <section v-if="themeStore.tags.visible">
        <AppTags :style="{ height: `${themeStore.tags.height}px` }" />
      </section>
      <n-layout-content content-style="padding: 24px;" border-b bc-eee>
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
