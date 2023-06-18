<script setup lang="ts">
import { Sudoku } from '~/composables/SudokuLogic'
const indexX = ref([12, 12])
const sudoku = new Sudoku()
while (!sudoku.makeSudoku()) {}
sudoku.shuffle()
const arr2: any = ref(copy(sudoku.digits))
const divActive = ref('')
const unChanged = ref([...sudoku.unChanged])
function btnClick(x: number) {
  arr2.value[indexX.value[0]][indexX.value[1]] = x
}
const divDoubt: any = ref([])
// useStorage('sudoku-state', arr2)
function divClick(index1: number, index2: number) {
  if (sudoku.unChanged.includes(`${index1}${index2}`)) {
    divActive.value = `${index1}${index2}`
    indexX.value = []
    indexX.value.push(index1, index2)
  }
}
function restart() {
  while (!sudoku.makeSudoku()) {}
  sudoku.shuffle()
  unChanged.value = [...sudoku.unChanged]
  arr2.value = copy(sudoku.digits)
}
function reset() {
  arr2.value = copy(sudoku.digits)
}
function isValidSudoku(board: number[][]): boolean {
  const col: any = {}
  const box: any = {}
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const x = board[i][j]
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      if (col[`${j}${x}`] || box[`${boxIndex}${x}`])
        return false

      col[`${j}${x}`] = 1
      box[`${boxIndex}${x}`] = 1
    }
  }
  return true
}
function copy(arr: number[][]): number[][] {
  const re: number[][] = []
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].concat()
    re.push(temp)
  }
  return re
}
watchEffect(() => finish())
function finish() {
  if (isValidSudoku(arr2.value))
    alert('You Win!!!')
}
function youjian(index1: number, index2: number) {
  if (sudoku.unChanged.includes(`${index1}${index2}`)) {
    if (divDoubt.value.includes(`${index1}${index2}`)) {
      divDoubt.value = divDoubt.value.filter((item) => {
        return item !== `${index1}${index2}`
      })
    }
    else { divDoubt.value.push(`${index1}${index2}`) }
  }
}
</script>

<template>
  <div class="box1">
    <div class="box_grid">
      <div v-for="(item1, index1) in arr2" :key="item1" class="row">
        <div
          v-for="(item2, index2) in item1"
          :key="item2"
          flex
          justify-center
          items-center
          min-w-8
          min-h-8
          m="0.5"
          border
          hover:bg-gray
          :class="{
            row_item_inner_active: `${index1}${index2}` === divActive,
            doubt: divDoubt.includes(`${index1}${index2}`),
          }"
          @click="divClick(index1, index2)"
          @contextmenu.prevent="youjian(index1, index2)"
        >
          <div
            class="row_item_inner"
          >
            <template v-if="item2 !== -1">
              <template v-if="unChanged.indexOf(`${index1}${index2}`) === -1">
                <span>{{ item2 }}</span>
              </template>
              <template v-else>
                <span
                  style="color: blue; font-size: 18px; font-weight: bolder"
                >{{ item2 }}</span>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="numberBtn">
        <button v-for="item in 9" :key="item" @click="btnClick(item)">
          {{ item }}
        </button>
      </div>
      <div class="gameSetBtn">
        <button @click="restart()">
          重新开始
        </button>
        <button @click="reset()">
          复原
        </button>
        <button @click="finish()">
          完成
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.doubt{
    background-color: pink;
    position: relative;
}
.doubt::before{
    content: "?";
    display: block;
    top: -0.25rem;
    right: 0;
    position: absolute;
    color: red;
}
.box1 {
  padding: 20px;

  .box_grid {
    .row {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      .row_item_inner {
        width: 27px;
        height: 27px;
      }

      .row_item_inner_active {
        background-color: rgb(168,85,247);
        animation-name: shinePurple;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }

    }

    .numberBtn {
      margin-top: 15px;

      button {
        width: 30px;
        height: 30px;
      }
    }

    .gameSetBtn {
      margin-top: 15px;

      button {
        margin-right: 15px;
      }
    }
  }
}

@keyframes shinePurple {
  0% {
    box-shadow: 0 0 2px #d500f9, 0 0 2px #d500f9, 0 0 2px #d500f9;
  }
  50% {
    box-shadow: 0 0 5px #d500f9, 0 0 10px #d500f9, 0 0 10px #d500f9;
  }
  100% {
    box-shadow: 0 0 2px #d500f9, 0 0 2px #d500f9, 0 0 2px #d500f9;
  }
}
</style>
