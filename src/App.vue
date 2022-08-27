<script setup>
import AppProvider from '@/components/AppProvider/index.vue'
</script>

<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <Component :is="Component"></Component>
    </router-view>
  </AppProvider>
</template>

<style lang="scss">
#app {
  height: 100%;

  .n-config-provider {
    height: inherit;
  }
}
</style>
