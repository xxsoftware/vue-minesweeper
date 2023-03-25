<script setup lang="ts">
import { isDev, toggleDev } from '~/composables/storage'
import { MinePlay } from '~/composables/MineLogic'
const play = new MinePlay(10, 10)
useStorage('minesweeper-state', play.state)
const state = computed(() => play.board)
</script>

<template>
  <div>Minesweeper</div>
  <div flex="~ gap-1" justify-center p5>
    <div @click="toggleDev()">
      <div v-show="isDev" i-mdi-eye w-8 h-8 />
      <div v-show="!isDev" i-mdi-eye-off-outline w-8 h-8 />
    </div>
    <div btn @click="play.reset()">
      reset
    </div>
  </div>
  <div>
    <div v-for="(row, y) in state" :key="y" flex items-center justify-center>
      <MineBlock
        v-for="(item, x) in row"
        :key="x"
        :item="item"
        @click="play.onClick(item)"
        @contextmenu.prevent="play.onRightClick(item)"
      />
    </div>
  </div>
</template>
