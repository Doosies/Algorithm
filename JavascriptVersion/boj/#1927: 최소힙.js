const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
9
0
12345678
1
2
0
0
0
0
32
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => +stdin[line++];
})();

class MinHeap {
  arr = [];
  insert(val) {
    // 1. arr 맨 마지막에 삽입
    this.arr.push(val);
    // 2. 부모노드와 비교, 부모노드보다 작으면 교환, 부모노드보다 크면 리턴
    // 3. 루트 올때까지 2 반복
    let nowPos = this.arr.length - 1;
    while (this.getParent(nowPos) >= 0) {
      const parentPos = this.getParent(nowPos);
      if (this.arr[parentPos] > this.arr[nowPos]) {
        [this.arr[parentPos], this.arr[nowPos]] = [this.arr[nowPos], this.arr[parentPos]];
        nowPos = parentPos;
      } else {
        return;
      }
    }
  }
  delete() {
    // 1. 루트, 마지막 변경
    const last = this.arr.length - 1;

    [this.arr[0], this.arr[last]] = [this.arr[last], this.arr[0]];

    const returnVal = this.arr.pop();
    // 2. 자식노드와 비교, 부모보다 크면 변경
    let nowPos = 0;
    let leftPos = 0;
    let rightPos = 0;
    // 왼쪽 자식이 없을때까지 반복
    while (this.arr[leftPos]) {
      leftPos = this.getLeft(nowPos);
      rightPos = this.getRight(nowPos);

      let changePos = leftPos;
      // 오른쪽 자식이 있고 왼쪽자식 > 오른쪽 자식일경우
      if (this.arr[rightPos] !== undefined && this.arr[leftPos] > this.arr[rightPos]) {
        changePos = rightPos;
      }

      if (this.arr[nowPos] > this.arr[changePos]) {
        [this.arr[nowPos], this.arr[changePos]] = [this.arr[changePos], this.arr[nowPos]];
        nowPos = changePos;
      } else {
        break;
      }
    }
    return returnVal;
  }
  getParent = idx => Math.floor((idx - 1) / 2);
  getLeft = idx => idx * 2 + 1;
  getRight = idx => idx * 2 + 2;
}

const N = input();
const heap = new MinHeap();
let zeroCnt = 0;
let ans = '';

for (let i = 0; i < N; i++) {
  const num = input();
  if (num === 0) {
    if (heap.arr.length === 0) ans += `0\n`;
    else ans += `${heap.delete()}\n`;
  } else {
    heap.insert(num);
  }
}

console.log(ans.trim());
