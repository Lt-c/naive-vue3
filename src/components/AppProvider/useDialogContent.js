import { defineComponent, h } from 'vue'
import { isNullOrUndef } from '@/utils/is'
import { useDialog } from 'naive-ui'

export default /*#__PURE__*/ defineComponent({
  setup() {
    const NDialog = useDialog()
    NDialog.confirm = (option = {}) => {
      const showIcon = !isNullOrUndef(option.title)
      return NDialog[option.type || 'warning']({
        showIcon,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: option.confirm,
        onNegativeClick: option.cancel,
        onMaskClick: option.cancel,
        ...option,
      })
    }
    // 挂载到window上
    window['$dialog'] = NDialog
    // 固定$dialog的原型
    Object.freeze(window.$dialog)
    Object.defineProperty(window, '$dialog', {
      configurable: false,
      writable: false,
    })
    return () => h('div')
  },
})
