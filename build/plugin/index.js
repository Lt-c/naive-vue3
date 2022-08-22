import vue from '@vitejs/plugin-vue'


/* 
  扩展setup插件，在script中使用name属性
*/
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
/* 打包分析插件 */
import { visualizer } from 'rollup-plugin-visualizer'
/* 设置index.html title插件 */
import { configHtmlPlugin } from './html'
/* unocss */
import { unocss } from './unocss';

export function createVitePlugin(viteEnv, isBuild) {
  const plugins = [
    vue(),
    vueSetupExtend(), /* script中支持name */
    configHtmlPlugin(viteEnv, isBuild),/* 修改index.html文件的，使其可以使用变量 */
    unocss(),/* unocss */
  ]
  // 打包分析插件
  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,  /* 自动打开浏览器 */
        gzipSize: true, /* 计算gzip后的大小 */
        brotliSize: true,/* 计算brotli的大小 */
      })
    )
  }






  return plugins
}