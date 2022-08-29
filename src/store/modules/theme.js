import { defineStore } from 'pinia'
import { themeSettings } from '@/settings'

export const useThemeStore = defineStore('theme', {
  state() {
    // 返回的是一个json对象，可以在json文件中对其进行配置
    return themeSettings
  },
  actions: {
    setTabVisible(visible) {
      console.log(this)
      this.tags.visible = visible
    },
  },
})
