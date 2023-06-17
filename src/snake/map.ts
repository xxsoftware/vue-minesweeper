import type { Map } from '~/types'

const clientWidth = document.documentElement.clientWidth - 20
const clientHeight = document.documentElement.clientHeight - 40

// 行数
export const gameRow = clientHeight > 700 ? Math.floor(clientHeight / 54) : Math.floor(clientHeight / 48)

// 列数
export const gameCol = clientWidth > 700 ? Math.floor(clientWidth / 54) : Math.floor(clientWidth / 34)

// 初始化地图  现在所有的位置type都是0
export function initMap(map: Map) {
  for (let i = 0; i < gameRow; i++) {
    const arr: Array<number> = []
    for (let j = 0; j < gameCol; j++)
      arr.push(0)

    map.push(arr)
  }
  return map
}
