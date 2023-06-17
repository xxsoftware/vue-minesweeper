export interface BlockState {
  revealed?: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
  x: number
  y: number
}

export type Map = Array<Array<number>>

export interface SnakeHead {
  x: number
  y: number
  status: number
}

export type SnakeBody = SnakeHead

export type SnakeBodies = SnakeBody[]

export interface StateType {
  map: Map
}

export type IsLive = Ref<number>
