const httpsReg = /^https:\/\//

/* 获取env环境中的设置 */
export function wrapperEnv(envOptions) {
  if (!envOptions) return {}
  const rst = {}
  for (const key in envOptions) {
    let val = envOptions[key]
    // 判断是否开启
    if (['true', 'false'].includes(val)) {
      val = val === 'true'
    }

    // 自动获取端口
    if (['VITE_PORT'].includes(key)) {
      val = +val
    }
    // 是否配置代理
    if (key === 'VITE_PROXY' && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'))
      } catch (e) {
        val = ''
      }
    }

    rst[key] = val
  }
  return rst

}


/* 获取代理 */
export function createProxy(list = []) {
  // 传入代理，为数组
  const rst = {};
  for (const [prefix, target] of list) {
    // 自动结构 api 和 代理路径
    const isHttps = httpsReg.test(target)

    rst[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {})/* 如果是https则 secure设置为false */
    }
  }
  return rst
}