import Unocss from 'unocss/vite'
import { presetIcons, presetUno, presetAttributify } from 'unocss'
import unocssRules from './unocssRules'

export function unocss() {
  return Unocss({
    // unocss 预设
    presets: [presetIcons(), presetUno(), presetAttributify()],
    // 自定义的预设
    rules: unocssRules,
  })
}
// 导出到./index.js
