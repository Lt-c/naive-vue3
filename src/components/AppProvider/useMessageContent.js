import { defineComponent, h } from 'vue'
import { useMessage } from 'naive-ui'
export default defineComponent({
  setup() {
    const NMessage = useMessage()
    let loadingMessage = null

    class Message {
      /*  
          规则
          * loading message只会显示一个，新的message会替换正在显示的loading message
          * loading message不会自动清除，除非呗替换成非loading message，非loading message默认2s后自动清除
      */
      removeMessage(message, duration = 2000) {
        setTimeout(() => {
          if (message) {
            message.destroy()
            message = null
          }
        }, duration)
      }

      showMessage(type, content, option = {}) {
        if (loadingMessage && loadingMessage.type === 'loading') {
          // 如果存在，那么替换正在显示的loading message
          loadingMessage.type = type
          loadingMessage.content = content

          // 非loading message需设置自动清除
          type !== 'loading' && this.removeMessage(loadingMessage, option.duration)
        } else {
          // 不存在正在显示的loading则新建一个message，如果新建的message是loading message则将message赋值存储下来
          let message = NMessage[type](content, option)
          if (type === 'loading') {
            loadingMessage = message
          }
        }
      }

      loading(content) {
        this.showMessage('loading', content, { duration: 0 })
      }

      success(content, option = {}) {
        this.showMessage('success', content, option)
      }

      error(content, option = {}) {
        this.showMessage('error', content, option)
      }

      info(content, option = {}) {
        this.showMessage('info', content, option)
      }

      warning(content, option = {}) {
        this.showMessage('warning', content, option)
      }
    }

    window['$message'] = new Message()
    Object.defineProperty(window, '$message', {
      configurable: false,
      writable: false,
    })
    return () => h('div')
  },
})
