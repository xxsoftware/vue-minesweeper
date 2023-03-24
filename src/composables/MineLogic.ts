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
interface GameState {
  board: BlockState[][]
  mineGenerated: boolean
  gameState: 'play' | 'won' | 'lost'
}
export class MinePlay {
  state = ref() as Ref<GameState>
  constructor(public width: number, public height: number) {
    this.reset()
  }

  get board() {
    return this.state.value?.board
  }

  reset() {
    this.state.value = {
      mineGenerated: false,
      gameState: 'play',
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width }, (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          revealed: false,
          mine: false,
        //   flagged: false,
        })),
      ),
    }
  }

  generateMines(state: BlockState[][], initial: BlockState) {
    for (const row of state) {
      for (const block of row) {
        if (Math.abs(initial.x - block.x) <= 1)
          continue
        if (Math.abs(initial.y - block.y) <= 1)
          continue
        block.mine = Math.random() < 0.25
      }
    }
    state.flat().forEach((a) => {
      a.flagged = false
    })
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

  lose() {
    this.board.flat().forEach((block) => {
      if (block.mine)
        block.revealed = true
    })
    this.state.value.gameState = 'lost'
    alert('BOOOOOOOOOM!')
  }

  win() {
    alert('you win')
    this.state.value.gameState = 'won'
  }

  onClick(block: BlockState) {
    if (this.state.value.gameState !== 'play')
      return
    if (!this.state.value.mineGenerated) {
      this.generateMines(this.board, block)
      this.updateNumbers()
      this.state.value.mineGenerated = true

      block.revealed = true
      this.expendZero(block)
    }
    else {
      block.revealed = true
      if (block.mine) {
        this.lose()
      }
      else {
        this.checkGameState()
        this.expendZero(block)
      }
    }
  }

  onRightClick(block: BlockState) {
    if (this.state.value.gameState !== 'play')
      return

    if (block.revealed)
      return

    block.flagged = !block.flagged
    if (block.flagged)
      this.checkGameState()
  }

  // watchEffect(checkGameState)
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
