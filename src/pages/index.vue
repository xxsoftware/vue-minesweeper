<script setup lang="ts">
import type { BlockState } from '~/types'
const WIDTH = 5
const HEIGHT = 5
const state = ref(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH }, (_, x): BlockState => ({
      x,
      y,
      adjacentMines: 0,
      revealed: false,
      mine: false,
    //   flagged: false,
    })),
  ),
)
function generateMines(initial: BlockState) {
  for (const row of state.value) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) <= 1)
        continue
      if (Math.abs(initial.y - block.y) <= 1)
        continue
      block.mine = Math.random() < 0.3
    }
  }
  state.value.flat().forEach((a) => {
    a.flagged = false
  })
}

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
const numberColors = [
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-blue-500',
  'text-orange-500',
  'text-red-500',
  'text-gray-500',

]
function updateNumbers() {
  state.value.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      getSiblings(block).forEach((b) => {
        if (b.mine)
          block.adjacentMines++
      })
    })
  })
}
function getBlockClass(block: BlockState) {
  if (block.flagged)
    return 'bg-gray-500/10'

  if (!block.revealed)
    return 'bg-gray-500/10 hover:500/20 '

  return block.mine ? 'text-red' : numberColors[block.adjacentMines]
}
let mineGenerated = false
let dev = false
function expendZero(block: BlockState) {
  if (block.adjacentMines)
    return
  getSiblings(block).forEach((s) => {
    if (!s.revealed) {
      s.revealed = true
      expendZero(s)
    }
  })
}
function onClick(block: BlockState) {
  if (!mineGenerated) {
    generateMines(block)
    updateNumbers()
    mineGenerated = true

    block.revealed = true
    expendZero(block)
  }
  else {
    block.revealed = true
    checkGameState()
    expendZero(block)
    if (block.mine) {
      dev = true
      alert('BOOOOOOOOOM!')
    }
  }
}
function onRightClick(block: BlockState) {
  if (block.revealed)
    return

  block.flagged = !block.flagged
  if (block.flagged)
    checkGameState()
}
// watchEffect(checkGameState)
function checkGameState() {
  if (!mineGenerated)
    return
  const blocks = state.value.flat()
  if ((blocks.every(block =>
    block.revealed !== block.mine,
  ))
  || (blocks.every(block =>
    block.mine === block.flagged,
  ))
  )
    alert('you win')
}
function getSiblings(block: BlockState) {
  return directions.map(([dx, dy]) => {
    const x2 = block.x + dx
    const y2 = block.y + dy
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined
    return state.value[y2][x2]
  }).filter(Boolean) as BlockState[]
}
</script>

<template>
  <div>Minesweeper</div>
  <div p5>
    <div v-for="(row, y) in state" :key="y" flex items-center justify-center>
      <button
        v-for="(item, x) in row"
        :key="x"
        flex
        justify-center
        items-center
        w-8
        h-8
        border
        :class="getBlockClass(item)"
        hover:bg-gray
        @click="onClick(item)"
        @contextmenu.prevent="onRightClick(item)"
      >
        <template v-if="item.flagged">
          <div i-mdi-flag />
        </template>
        <template v-else-if="item.revealed || dev">
          <div v-if="item.mine" i-mdi-mine />
          <div v-else>
            {{ item.adjacentMines == 0 ? "" : item.adjacentMines }}
          </div>
        </template>
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
