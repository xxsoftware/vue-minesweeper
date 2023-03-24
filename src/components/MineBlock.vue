<script setup lang="ts">
import type { BlockState } from '~/types'
import { isDev } from '~/composables/storage'
defineProps<{
  item: BlockState
}>()
const numberColors = [
  '',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-blue-500',
  'text-orange-500',
  'text-red-300',
  'text-red-800',

]
function getBlockClass(block: BlockState) {
  if (block.flagged)
    return 'bg-gray-500/10'

  if (!block.revealed)
    return 'bg-gray-500/40 hover:500/80 '

  return block.mine ? 'text-red' : numberColors[block.adjacentMines]
}
</script>

<template>
  <div>
    <button
      flex
      justify-center
      items-center
      w-10
      h-10
      m="0.5"
      border
      hover:bg-gray
      :class="getBlockClass(item)"
    >
      <template v-if="item.flagged">
        <div i-mdi-flag text-red-600 />
      </template>
      <template v-else-if="item.revealed || isDev">
        <div v-if="item.mine" i-mdi-mine />
        <div v-else>
          {{ item.adjacentMines === 0 ? "" : item.adjacentMines }}
        </div>
      </template>
    </button>
  </div>
</template>
