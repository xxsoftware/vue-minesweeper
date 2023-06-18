export class Sudoku {
  digits: number[][]
  unChanged: string[]
  unChangedCount: number
  constructor() {
    this.digits = this.makeMatrix(9)
    this.unChangedCount = 48// 挖掉48个空
    this.unChanged = []// 挖掉的空
  }

  makeSudoku(): boolean {
    const temp = this.makeMatrix(9)
    let randNineArr = this.randNine()
    for (let i = 0; i < 9; i++)
      temp[i].push(randNineArr[i])

    let box = this.makeMatrix(3)
    box[0] = [...randNineArr.slice(0, 3)]
    box[1] = [...randNineArr.slice(3, 6)]
    box[2] = [...randNineArr.slice(6)]
    for (let i = 1; i < 9; i++) {
      randNineArr = this.randNine()
      if (i % 3 === 0)
        box = this.makeMatrix(3)

      let count = 0
      for (let j = 0; j < 9; j++) {
        if (
          !box[Math.floor(j / 3)].includes(randNineArr[j])
          && !temp[j].includes(randNineArr[j])
        ) {
          temp[j].push(randNineArr[j])
          box[Math.floor(j / 3)].push(randNineArr[j])
          count = 0
        }
        else {
          count++
          this.moveArrItem(randNineArr, j)
          j--
          if (count > 8 - j)
            return false
        }
      }
    }
    this.digits = temp
    return true
  }

  randNine() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
  }

  makeMatrix(n: number): number[][] {
    return Array.from(Array(n), (): number[] => [])
  }

  moveArrItem(arr: number[], start: number) {
    const first = arr[start]
    for (let i = start; i < 8; i++)
      arr[i] = arr[i + 1]

    arr[8] = first
  }

  shuffle() {
    this.unChanged = []
    while (this.unChanged.length < this.unChangedCount) {
      const x = Math.floor(Math.random() * 9)
      const y = Math.floor(Math.random() * 9)
      if (this.unChanged.includes(`${x}${y}`)) {
        continue
      }
      else {
        this.unChanged.push(`${x}${y}`)
        this.digits[x][y] = -1
      }
    }
  }
}
