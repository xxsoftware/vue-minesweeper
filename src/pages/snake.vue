<script lang="ts" setup>
import type { StateType } from '~/types'
import { changeDirection, initGame, replayGame, startGame } from '~/snake'
const state = reactive<StateType>({
  map: [],
})
const isLive = ref(1)
const startMS = ref(0)
const start = () => {
  startMS.value = Date.now()
  startGame()
}
const replay = () => {
  startMS.value = Date.now()
  replayGame()
}
const change = (direction: string) => {
  changeDirection(direction)
}
const now = $(useNow())
const countdown = $computed(() => Math.round((+now - startMS.value) / 1000))
initGame(state.map, isLive)
</script>

<template>
  <div>
    Snake
  </div>
  <div flex="~ gap-20" justify-center p5>
    <div btn @click="replay">
      new Game
    </div>
    <div>
      <div i-mdi-clock w-8 h-8 />
      {{ countdown }}
    </div>
  </div>
  <div class="app-content" p5>
    <SnakeMap :map="state.map" />
    <SnakeController :is-live="isLive" @start="start" @replay="replay" />
    <SnakeKeyBoard :is-live="isLive" @changeDirection="change" />
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-content {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
