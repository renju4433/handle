/**
 * SPOILERS
 *
 * This file contains the list of answers for the game. It's not recommended to continue reading this file.
 *
 * 剧透警告
 *
 * 该文件包含了游戏的答案列表。不建议继续阅读。
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import { seedShuffle } from './utils'

function prepare<T>(len: number, arr: T[]) {
  if (arr.length !== len)
    throw new Error(`expect array length ${arr.length} to be ${len}`)
  return arr
}


export const _2025_5 = prepare(7, [
  ['张轶峰',,['山东']],
  ['李源浩',,['澳门']],
  ['徐嘉琦',,['河北']],
  ['汪清清',,['湖北']],
  ['崔展铭',,['辽宁']],
  ['葛凌峰',,['上海']],
  ['张玉灏',,['上海']],
])

export const answers: (any[] | string[] | (string | string[])[])[] = [
  ..._2025_5
]

// duplicated check
if (import.meta.hot) {
  const map = new Map<string, number>()
  answers.forEach((a, i) => {
    if (!a[0])
      return
    if (!map.has(a[0]))
      map.set(a[0], i)
    else
      throw new Error(`Word ${a[0]} is duplicated at ${map.get(a[0])}`)
  })
}
