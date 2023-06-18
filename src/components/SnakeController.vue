<script lang="ts" setup>
defineProps({
  isLive: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['start', 'replay'])
</script>

<template>
  <transition name="base">
    <!-- 遮罩层 -->
    <div v-if="isLive !== 2" class="controller-box">
      <div v-if="isLive === 1" class="show-btn" @click="emit('start')">
        开始游戏
        <div class="options-tips">
          <p>手机玩家请点击屏幕进行操作;</p>
          <p>电脑玩家请通过按键 ↑ ↓ ← → 进行操作;</p>
        </div>
      </div>
      <div v-if="isLive === 3" class="show-btn" @click="emit('replay')">
        <div btn>
          <p>replay</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.controller-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .show-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .options-tips {
    color: #f0d095;
    font-size: 12px;
    p {
      padding: 5px 0;
    }
  }
}
//淡入淡出
.base-enter-active,
.base-leave-active {
  transition: all 0.3s ease;
}
.base-enter-to,
.base-leave-from {
  opacity: 1;
}
.base-enter-from,
.base-leave-to {
  opacity: 0;
}
</style>
