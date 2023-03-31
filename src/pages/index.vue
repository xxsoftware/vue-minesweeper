<script setup lang="ts">
import { isDev, toggleDev } from '~/composables/storage'
import { MinePlay } from '~/composables/MineLogic'
const play = new MinePlay(12, 12, 20)
const now = $(useNow())
const countdown = $computed(() => Math.round((+play.state.value.endMS || +now - +play.state.value.startMS) / 1000))
function newGame(difficulty: 'easy' | 'medium' | 'hard') {
  switch (difficulty) {
    case 'easy' :
      play.reset(9, 9, 10)
      break
    case 'medium' :
      play.reset(16, 16, 40)
      break
    case 'hard' :
      play.reset(30, 16, 99)
      break
  }
}
const mineRest = $computed(() => {
  if (!play.state.value.mineGenerated)
    return play.mines

  return play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0) - (b.flagged ? 1 : 0), 0)
})
const state = computed(() => play.board)
useStorage('minesweeper-state', play.state)
watchEffect(() => play.checkGameState())
</script>

<template>
  <div>
    <div>
      Minesweeper
    </div>
    <div flex="~ gap-1" justify-center p5>
      <div btn @click="play.reset()">
        New Game
      </div>
      <div btn @click="newGame('easy')">
        Easy
      </div>
      <div btn @click="newGame('medium')">
        Medium
      </div>
      <div btn @click="newGame('hard')">
        Hard
      </div>
    </div>
    <div flex="~ gap-30" justify-center>
      <div @click="toggleDev()">
        <div v-show="isDev" i-mdi-eye w-8 h-8 />
        <div v-show="!isDev" i-mdi-eye-off-outline w-8 h-8 />
      </div>

      <div>
        <div i-mdi-clock w-8 h-8 />
        {{ countdown }}
      </div>
      <div>
        <div i-mdi-mine w-8 h-8 />
        {{ mineRest }}
      </div>
    </div>
    <div w-full overflow-auto p5>
      <div v-for="(row, y) in state" :key="y" flex ma w-max>
        <MineBlock
          v-for="(item, x) in row"
          :key="x"
          :item="item"
          @click="play.onClick(item)"
          @dblclick="play.autoExpand(item)"
          @contextmenu.prevent="play.onRightClick(item)"
        />
      </div>
    </div>
    <Confetti :passed="play.state.value.status === 'won'" />
  </div>
</template>
