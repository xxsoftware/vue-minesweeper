<script lang='ts' setup>
const props = defineProps(['type'])
const classes = computed(() => {
  return {
    head: props.type === 2,
    body: props.type === 1,
    food: props.type === -1,
  }
})
</script>

<template>
  <div
    class="cell-box bg-gray-500/40 hover:500/80"
    min-w-8
    min-h-8
    m="0.5"
    border
    :class="classes"
  />
</template>

<style lang='scss'>
.head {
  background: #fafafa;
  box-shadow: 0 0 10px #1e88e5, 0 0 20px #1e88e5, 0 0 40px #1e88e5;
}
.body {
  background: black;
  box-shadow: 0 0 5px #76ff03, 0 0 5px #76ff03, 0 0 10px #76ff03;
}
.food {
  background: rgb(168,85,247);
  animation-name: shineFood;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes shineFood {
  0% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
  50% {
    box-shadow: 0 0 10px #d500f9, 0 0 20px #d500f9, 0 0 20px #d500f9;
  }
  100% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
}
</style>
