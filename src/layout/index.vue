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
  <n-layout has-sider h-full w-full>
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

    <article flex-1 flex-col overflow-hidden>
      <header bg-white px-15 border-b bc-eee flex items-center :style="`height: ${themeStore.header.height}px`">
        <AppHeader />
      </header>
      <section v-if="themeStore.tags.visible" border-b bc-eee>
        <AppTags :style="{ height: `${themeStore.tags.height}px` }" />
      </section>
      <section flex-1 overflow-hidden>
        <AppMain />
      </section>
    </article>
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
