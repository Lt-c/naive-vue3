import Unocss from 'unocss/vite'
import { presetIcons, presetUno, presetAttributify } from 'unocss'

export function unocss() {
  return Unocss({
    // unocss 预设
    presets: [presetIcons(), presetUno(), presetAttributify()],
  })
}
// 导出到./index.js
