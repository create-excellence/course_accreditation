/* eslint-disable no-prototype-builtins */
export function encodeQuery(object: { [key: string]: any }): string {
  const kvArray: string[] = []
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue
    }
    const kv = encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
    kvArray.push(kv)
  }
  return kvArray.join('&')
}

/**
 * 取字符串的 hash 值。
 * taken from : https://github.com/darkskyapp/string-hash/blob/master/index.js
 * @param str 字符串
 */
export function hash(str: string): number {
  let hash = 5381
  let i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0
}

/**
 * 用于从 Promise 拒绝的 reason 中提取出对应拒绝的错误信息。
 * 已知可能错误:
 * 1) reason 直接是错误说明
 * 2) reason 是 {code:400, message:"错误说明"} 这样的结构。
 * 3）reason 是 wx 错误回调常见的 {errMsg:"错误说明"}
 *
 * @param reason Promise 拒绝理由
 */
export function extractRejectText(reason?: any): string {
  if (reason) {
    if (typeof reason === 'string') {
      return reason
    } else {
      if (typeof reason === 'object') {
        if (reason.message) {
          return reason.message
        } else if (reason.errMsg) {
          return reason.errMsg
        } else {
          console.info('unkown reason object:', reason)
        }
      } else {
        console.info('unkown reason:', reason)
      }
    }
  }
  return '未知错误'
}

export function parseISODateString(dateStr: string | Date): Date {
  if (dateStr instanceof Date) {
    return dateStr
  }
  // const year = parseInt(dateStr.substr(0, 4));
  // const month = parseInt(dateStr.substr(5, 2));
  // const day = parseInt(dateStr.substring(9));
  // return new Date(year, month - 1, day);
  return new Date(dateStr)
}

/**
 * 等待一段时间
 * @param seconds 等待的时间
 */
export function wait(seconds: number): Promise<boolean> {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

/**
 * Act like Promise.deferred
 * creates an object consisting of { promise, resolve, reject }:
 * promise is a promise that is currently in the pending state.
 * resolve(value) resolves the promise with value.
 * reject(reason) moves the promise from the pending state to the rejected state, with rejection reason reason.
 */
export function deferred<T>() {
  let resolveP: (value?: T | PromiseLike<T> | undefined) => void = value => value
  let rejectP: (reason?: any) => void = error => error
  const promise = new Promise<T>((resolve, reject) => {
    resolveP = resolve
    rejectP = reject
  })
  return { promise: promise, resolve: resolveP, reject: rejectP }
}

/**
 * 利用 JSON 的序列化和反序列化实现深拷贝
 * @param value 对象或数组
 */
export function deepcopy(value: object | any[]) {
  return JSON.parse(JSON.stringify(value))
}

/**
 * 判断两个数组是否有交集
 * @param arr1 数组1
 * @param arr2 数组2
 */
export function hasIntersection(arr1: any[], arr2: any[]): boolean {
  for (const item of arr2) {
    if (arr1.includes(item)) {
      return true
    }
  }
  return false
}

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
