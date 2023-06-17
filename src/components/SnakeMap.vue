<script setup lang="ts">
import { gameCol, gameRow } from '~/snake/map'

defineProps(['map'])
</script>

<template>
  <div class="game-box">
    <!-- 行 -->
    <div
      v-for="row in gameRow"
      :key="row"
      class="row"
    >
      <!-- 列 -->
      <div
        v-for="col in gameCol"
        :key="col"
        class="col"
      >
        <!-- 小格子 -->
        <SnakeCell :type="map[row - 1][col - 1]" />
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.game-box {
  opacity: 0.85;
  border: 1px solid #fff;
  .row {
    display: flex;
  }
}
</style>
