/* 
  判断类型的工具函数
*/

const toString = Object.prototype.toString

/* 判断类型 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

/* 非undefined */
export function isDef(val) {
  return typeof val !== 'undefined'
}

/* 是undefined */
export function isUndef(val) {
  return typeof val === 'undefined'
}
/* 为null */
export function isNull(val) {
  return val === null
}

/* 为空字符串 */
export function isWhiteSpace(val) {
  return val === ''
}

/* 非空对象 */
export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}

/* 数组 */
export function isArray(val) {
  return val && Array.isArray(val)
}

/* 字符串 */
export function isString(val) {
  return is(val, 'String')
}

/* number 类型 */
export function isNumber(val) {
  return is(val, 'Number')
}

/* boolean 类型*/
export function isBoolean(val) {
  return is(val, 'Boolean')
}

/* Date 类型*/
export function isDate(val) {
  return is(val, 'Date')
}

/* 正则 */
export function isRegExp(val) {
  return is(val, 'RegExp')
}

/* 函数 */
export function isFunction(val) {
  return typeof val === 'function'
}

/* promise对象 */
export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/* 元素 */
export function isElement(val) {
  return isObject(val) && !!val.tagName
}

/* window对象 */
export function isWindow(val) {
  return typeof window !== 'undefined' && isDef(window) && is(val, 'Window')
}

/* 为null或者undefined */
export function isNullOrUndef(val) {
  return isNull(val) || isUndef(val)
}

/*为null或者undefined或者为 '' */
export function isNullOrWhitespace(val) {
  return isNullOrUndef(val) || isWhitespace(val)
}

/* 为empty */
export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}
/* 第一个参数为null/undefined/'' 则返回第二参数作为备用值 */
export function ifNull(val, def = '') {
  return isNullOrWhitespace(val) ? def : val
}

/* https路径 */
export function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/* 外链 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/* 服务器 */
export const isServer = typeof window === 'undefined'

export const isClient = !isServer
