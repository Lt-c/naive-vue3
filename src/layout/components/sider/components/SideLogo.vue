<script setup>
import { renderIcon } from '@/utils/icon'
import { IconDefault } from '@/components/AppIcons'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const title = import.meta.env.VITE_TITLE || '1111111'
</script>

<template>
  <RouterLink h-60 f-c-c color-red to="/">
    <component :is="renderIcon(IconDefault, { class: 'text-36' })"></component>
    <h2 v-show="!appStore.collapsed" ml-10 text-16 font-bold max-w-140 flex-shrink-0>
      {{ title }}
    </h2>
  </RouterLink>
</template>
