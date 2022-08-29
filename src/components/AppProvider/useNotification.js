import { defineComponent, h } from 'vue'
import { useNotification } from 'naive-ui'

export default defineComponent({
  setup() {
    window['$notification'] = useNotification()
    Object.freeze(window.$notification)
    Object.defineProperty(window, '$notification', {
      configurable: false,
      writable: false,
    })
    return () => h('div')
  },
})
