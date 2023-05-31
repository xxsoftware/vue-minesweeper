<script setup lang="ts">
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <div class="time">
    {{ formatted }}
  </div>
</template>

<style scoped>
.time {
  font-family: timeFont;
  font-size: 4rem;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: purple;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.7);
}
.dark .time{
    background-color: #14ffe9;
}
</style>
