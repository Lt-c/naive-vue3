<script setup>
import { useThemeStore } from '@/store/modules/theme'
import DialogContent from './useDialogContent'
import LoadingBar from './useLoadingBar'
import MessageContent from './useMessageContent'
import Notification from './useNotification'

const useTheme = useThemeStore()
</script>

<template>
  <n-config-provider h-full w-full :theme-overrides="useTheme.naiveThemeOverrides">
    <n-loading-bar-provider>
      <LoadingBar />
      <n-dialog-provider>
        <DialogContent />
        <n-message-provider>
          <MessageContent />
          <n-notification-provider>
            <Notification />
            <slot></slot>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
