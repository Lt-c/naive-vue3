import { defineConfig, loadEnv } from 'vite'
import path from 'path'

// 工具函数 配置在env中配置
import { wrapperEnv, createProxy } from './build/utils'
// 插件在此处安装
import { createVitePlugin } from './build/plugin'

export default defineConfig(({ command, mode }) => {
  // 拿到环境变量 也可以使用process.env.xxx方式使用
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  const isBuild = command === 'build'

  return {
    plugins: createVitePlugin(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || '/',
    css: {
      preprocessorOptions: {
        // 设置默认全局样式
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    /* 服务端口 */
    server: {
      // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      port: VITE_PORT /* 端口 */,
      proxy: createProxy(VITE_PROXY) /* 代理 */,
    },
  }
})
