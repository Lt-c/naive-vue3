/**
 * @description: 防抖
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(fn, delay, immediate) {
  let timer = null
  return function (...args) {
    let self = this

    // 如果已经存在执行中的tiemr，就清除，重新执行
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      /* 
        如果定时器不存在，则立刻执行，并设定一个定期器。dalay后定时器设为null
      */
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (callNow) {
        fn.apply(self, args)
      }
    } else {
      // immediate 为false
      timer = setTimeout(() => {
        fn.apply(self, args)
      }, delay)
    }
  }
}
