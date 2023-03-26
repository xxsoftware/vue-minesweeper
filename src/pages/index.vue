<script setup lang="ts">
import { isDev, toggleDev } from '~/composables/storage'
import { MinePlay } from '~/composables/MineLogic'
const play = new MinePlay(10, 10)
useStorage('minesweeper-state', play.state)
const state = computed(() => play.board)
const music = new Audio()
music.src = 'https://m801.music.126.net/20230326003835/0db94b54aca73c252e3b5a7ea075b733/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/25197371564/e0a3/7b75/72e5/d0e93789410c177c4bb1455644fcb43c.m4a'
music.loop = true
music.volume = 0.05
// useTitle('goodmoring')
// music.addEventListener('ended', playEndedHandler, false)
</script>

<template>
  <div @click="music.play()">
    <div>Minesweeper</div>
    <!-- <audio  controls loop="true" src="https://m801.music.126.net/20230326003835/0db94b54aca73c252e3b5a7ea075b733/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/25197371564/e0a3/7b75/72e5/d0e93789410c177c4bb1455644fcb43c.m4a" /> -->
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
  </div>
</template>
