<script setup lang="ts">
import type { BlockState } from '~/types'
import { isDev, toggleDev } from '~/composables/storage'
const WIDTH = 10
const HEIGHT = 10
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
let mineGenerated = false
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
// let dev = false
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
    if (block.mine) {
      alert('BOOOOOOOOOM!')
      isDev.value = true
    }
    else {
      checkGameState()
      expendZero(block)
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
  <div flex justify-center items-center p5>
    <div @click="toggleDev()">
      <div v-show="isDev" i-mdi-eye w-8 h-8 />
      <div v-show="!isDev" i-mdi-eye-off-outline w-8 h-8 />
    </div>
  </div>
  <div>
    <div v-for="(row, y) in state" :key="y" flex items-center justify-center>
      <MineBlock
        v-for="(item, x) in row"
        :key="x"
        :item="item"
        @click="onClick(item)"
        @contextmenu.prevent="onRightClick(item)"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
