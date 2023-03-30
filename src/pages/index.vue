<script setup lang="ts">
import { isDev, toggleDev } from '~/composables/storage'
import { MinePlay } from '~/composables/MineLogic'
const play = new MinePlay(12, 12, 20)
function newGame(difficulty: 'easy' | 'medium' | 'hard') {
  switch (difficulty) {
    case 'easy' :
      play.reset(6, 6, 3)
      break
    case 'medium' :
      play.reset(10, 10, 10)
      break
    case 'hard' :
      play.reset(20, 20, 20)
      break
  }
}
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
      <div @click="toggleDev()">
        <div v-show="isDev" i-mdi-eye w-8 h-8 />
        <div v-show="!isDev" i-mdi-eye-off-outline w-8 h-8 />
      </div>
      <div btn @click="play.reset()">
        New Game
      </div>
      <div btn @click="newGame('easy')">
        easy
      </div>
      <div btn @click="newGame('medium')">
        medium
      </div>
      <div btn @click="newGame('hard')">
        hard
      </div>
    </div>
    <div w-full overflow-auto p5>
      <div v-for="(row, y) in state" :key="y" flex ma w-max>
        <MineBlock
          v-for="(item, x) in row"
          :key="x"
          :item="item"
          @click="play.onClick(item)"
          @contextmenu.prevent="play.onRightClick(item)"
        />
      </div>
    </div>
    <Confetti :passed="play.state.value.gameState === 'won'" />
  </div>
</template>
