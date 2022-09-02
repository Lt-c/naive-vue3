import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { Icon } from '@iconify/vue'

/**
 * @description: 处理icon
 * @param {string} icon 留‘’则为默认
 * @param {Object} props
 * @return {*} vnode
 */
export function renderIcon(icon, props = { size: 12 }) {
  return () =>
    h(
      NIcon,
      { ...props },
      { default: () => h(Icon, { icon: icon === '' ? 'material-symbols:turn-sharp-right' : icon }) }
    )
}
