import type { BlockState } from '~/types'
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
]
type GameStatus = 'play' | 'won' | 'lost'
interface GameState {
  board: BlockState[][]
  mineGenerated: boolean
  status: GameStatus
  startMS: number
  endMS: number
}
export class MinePlay {
  state = ref() as Ref<GameState>
  constructor(public width: number, public height: number, public mines: number) {
    this.reset()
  }

  get board() {
    return this.state.value?.board
  }

  get blocks() {
    return this.state.value.board.flat() as BlockState[]
  }

  reset(width = this.width, height = this.height, mines = this.mines) {
    this.width = width
    this.height = height
    this.mines = mines
    this.state.value = {
      mineGenerated: false,
      startMS: +Date.now(),
      endMS: 0,
      status: 'play',
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width }, (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          revealed: false,
          mine: false,
          flagged: false,
        })),
      ),
    }
  }

  randomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
  }

  generateMines(state: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1)
      const y = this.randomInt(0, this.height - 1)
      const block = state[y][x]
      if (Math.abs(initial.x - block.x) <= 1 && Math.abs(initial.y - block.y) <= 1)
        return false
      if (block.mine)
        return false
      block.mine = true
      return true
    }
    Array.from({ length: this.mines }, () => null).forEach(() => {
      let placed = false
      while (!placed)
        placed = placeRandom()
    })
    this.updateNumbers()
  }

  updateNumbers() {
    this.board.forEach((row) => {
      row.forEach((block) => {
        if (block.mine)
          return
        this.getSiblings(block).forEach((b) => {
          if (b.mine)
            block.adjacentMines++
        })
      })
    })
  }

  expendZero(block: BlockState) {
    if (block.adjacentMines)
      return
    this.getSiblings(block).forEach((s) => {
      if (!s.revealed) {
        s.revealed = true
        this.expendZero(s)
      }
    })
  }

  onGameOver(status: GameStatus) {
    this.state.value.status = status
    this.state.value.endMS = +Date.now() - this.state.value.startMS
  }

  lose() {
    this.board.flat().forEach((block) => {
      if (block.mine)
        block.revealed = true
    })
    alert('BOOOOOOOOOM!')
    this.onGameOver('lost')
  }

  win() {
    this.onGameOver('won')
  }

  onClick(block: BlockState) {
    if (this.state.value.status !== 'play')
      return
    if (!this.state.value.mineGenerated) {
      this.generateMines(this.board, block)

      this.state.value.mineGenerated = true

      block.revealed = true
      this.expendZero(block)
    }
    else {
      block.revealed = true
      if (block.mine)
        this.lose()

      else
        this.expendZero(block)
    }
  }

  onRightClick(block: BlockState) {
    if (this.state.value.status !== 'play')
      return

    if (block.revealed)
      return

    block.flagged = !block.flagged
  }

  checkGameState() {
    if (!this.state.value.mineGenerated)
      return
    const blocks = this.board.flat()
    if ((blocks.every(block =>
      block.revealed !== block.mine,
    ))
  || (blocks.every(block =>
    block.mine === block.flagged,
  ))
    )
      this.win()
  }

  autoExpand(block: BlockState) {
    const siblings = this.getSiblings(block)
    const flags = siblings.reduce((a, b) => a + (b.flagged ? 1 : 0), 0)
    const notRevealed = siblings.reduce((a, b) => a + ((!b.revealed && !b.flagged) ? 1 : 0), 0)
    if (flags === block.adjacentMines) {
      siblings.forEach((i) => {
        i.revealed = true
        if (i.mine)
          this.lose()
      })
    }
    const missingFlags = block.adjacentMines - flags
    if (notRevealed === missingFlags) {
      siblings.forEach((i) => {
        if (!i.revealed && !i.flagged)
          i.flagged = true
      })
    }
  }

  getSiblings(block: BlockState) {
    return directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
        return undefined
      return this.board[y2][x2]
    }).filter(Boolean) as BlockState[]
  }
}
