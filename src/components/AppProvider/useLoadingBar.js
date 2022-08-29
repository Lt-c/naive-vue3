import { defineComponent, h } from 'vue'
import { useLoadingBar } from 'naive-ui'
export default defineComponent({
  setup() {
    window['$loadingBar'] = useLoadingBar()
    Object.defineProperty(window, '$loadingBar', {
      configurable: false,
      writable: false,
    })
    return () => h('div')
  },
})
