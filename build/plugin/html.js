import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin(viteEnv, isBuild) {
  // 获取在env中设置的title
  const { VITE_APP_TITLE } = viteEnv;
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_APP_TITLE
      }
    }
  })
  return htmlPlugin
}
// 导出到 build/plugin/index.js中使用