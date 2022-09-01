import vue from '@vitejs/plugin-vue'

/*
 *扩展setup插件，在script中使用name属性
 */
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
/* 打包分析插件 */
import { visualizer } from 'rollup-plugin-visualizer'
/* 设置index.html title插件 */
import { configHtmlPlugin } from './html'
/* unocss */
import Unocss from 'unocss/vite'

/* 
  图标库 
  https://icones.js.org/
*/
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

/* 
  组件库按需引入
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

/* 导入mock */
import { configMockPlugin } from './mock'

export function createVitePlugin(viteEnv, isBuild) {
  const plugins = [
    vue(),
    vueSetupExtend() /* script中支持name */,
    configHtmlPlugin(viteEnv, isBuild) /* 修改index.html文件的，使其可以使用变量 */,
    Unocss() /* unocss */,
    Components({
      /* 自动按需引入 */ resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' }) /* 前缀为icon的自动使用图标 */,
      ],
    }),
    Icons({ compiler: 'vue3', autoInstall: true, scale: 1, defaultClass: 'inline-block' }),
  ]
  // 是否开启mock
  viteEnv?.VITE_APP_USE_MOCK && plugins.push(configMockPlugin(isBuild))

  // 打包分析插件
  if (isBuild) {
    plugins.push(
      visualizer({
        open: true /* 自动打开浏览器 */,
        gzipSize: true /* 计算gzip后的大小 */,
        brotliSize: true /* 计算brotli的大小 */,
      })
    )
  }

  return plugins
}
