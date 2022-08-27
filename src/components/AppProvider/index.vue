<script setup>
import { defineComponent, h } from 'vue'
import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'
/* 想在全局中使用这些提示组件，使用一种特殊的方式，将其挂载到window上 */
function setupNativeTools() {
  window.$naive = {
    loadingBar: useLoadingBar(),
    dialog: useDialog(),
    message: useMessage(),
    notification: useNotification(),
  }
}
const NaiveProviderContent = defineComponent({
  setup() {
    setupNativeTools()
  },
  render() {
    return h('div')
  },
})

const themeOverrides = {
  common: {
    primaryColor: '#316C72FF',
    primaryColorHover: '#316C72E3',
    primaryColorPressed: '#2B4C59FF',
    primaryColorSuppl: '#316C7263',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
