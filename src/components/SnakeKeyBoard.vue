<script lang='ts' setup>
defineProps({
  isLive: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['changeDirection'])
const isMobile = document.documentElement.clientWidth < 700
</script>

<template>
  <div
    v-if="isLive === 2 && isMobile"
    class="key-board-box"
  >
    <div
      class="up"
      @click="emit(&quot;changeDirection&quot;, &quot;Up&quot;)"
    />
    <div
      class="down"
      @click="emit(&quot;changeDirection&quot;, &quot;Down&quot;)"
    />
    <div
      class="left"
      @click="emit(&quot;changeDirection&quot;, &quot;Left&quot;)"
    />
    <div
      class="right"
      @click="emit(&quot;changeDirection&quot;, &quot;Right&quot;)"
    />
  </div>
</template>

<style lang='scss'>
.key-board-box {
  width: 240px;
  height: 220px;
  background: url('https://www.xxsoftware.top/img/controller.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  bottom: 30px;
  opacity: 0.5;
  .up {
    width: 75px;
    height: 75px;
    position: absolute;
    left: 80px;
    top: 0px;
  }
  .down {
    position: absolute;
    width: 75px;
    height: 75px;
    left: 80px;
    bottom: 15px;
  }
  .left {
    position: absolute;
    width: 75px;
    height: 75px;
    left: 0px;
    top: 68px;
  }
  .right {
    position: absolute;
    width: 75px;
    height: 75px;
    right: 0px;
    top: 68px;
  }
}
</style>
