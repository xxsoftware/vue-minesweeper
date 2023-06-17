<script setup lang="ts">
const gameList = [
  {
    name: '扫雷',
    status: 1,
    imgSrc: 'https://www.xxsoftware.top/img/minesweeper.png',
    path: '/minesweeper',
  },
  {
    name: '数独',
    status: 1,
    imgSrc: 'https://www.xxsoftware.top/img/sudoku.png',
    path: '/sudoku',
    // sudoku
  },
  {
    name: '华容道',
    status: 1,
    imgSrc: 'https://www.xxsoftware.top/img/Klotski.png',
    path: '/Klotski',
    // /Klotski
  },
  {
    name: '贪吃蛇',
    status: 1,
    imgSrc: 'https://www.xxsoftware.top/img/snake.png',
    path: '/snake',
    // snake
  },
  {
    name: '打砖块',
    status: 0,
    imgSrc: 'https://www.xxsoftware.top/img/bricks.png',
    path: '/bricks',
    // bricks
  },
  {
    name: '蜘蛛纸牌',
    status: 0,
    imgSrc: 'https://www.xxsoftware.top/img/spider.png',
    path: '/spider',
    // spider
  },
  {
    name: '水果忍者',
    status: 0,
    imgSrc: 'https://www.xxsoftware.top/img/ninja.png',
    path: '/ninja',
    // ninja
  },
]
</script>

<template>
  <h2 text-3xl>
    游戏库
  </h2>
  <ul ul mt-8 grid="~ cols-2 md:cols-3 " gap="x-15 y-4 sm:x-20 sm:y-6" p-10>
    <li v-for="(item, index) in gameList" :key="index" relative :class="item.status ? 'complete' : 'uncompleted'">
      <RouterLink :to="item.path" :data-example="item.name" class="gradient-border block cursor-pointer px-6 py-3 font-sans font-500 sm:text-xl">
        <img :src="item.imgSrc" class="gameImg">
        <p>
          {{ item.name }}
        </p>
      </RouterLink>
    </li>
  </ul>
</template>

<style>
.gradient-border {
  position: relative;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
}

.uncompleted {
    pointer-events: none;
}
.uncompleted::after{
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.2);
    position: absolute;
    content: "还在开发中";
    color: red;
    font-size: 2rem;
}
.gameImg{
    width: 150px;
    margin: 0 auto;
    padding: 20px;
}
.dark .gradient-border {
  background-color: rgba(0, 0, 0, 0.3);
}

.gradient-border:before {
  background: linear-gradient(90deg, #e2e2e2 0%, #e2e2e2 25%, #00DC82 50%, #36E4DA 75%, #0047E1 100%);
}

.gradient-border:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  padding: 2px;
  width: 100%;
  background-size: 400% auto;
  opacity: 0.5;
  transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.gradient-border:focus:before,
.gradient-border:hover:before {
  background-position: -50% 0;
  opacity: 1;
}
</style>
