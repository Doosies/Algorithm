// 문제링크: https://www.acmicpc.net/problem/18111
// 시작날짜: 2023.07.04
// 시작시간: 17:34
// 종료시간: 16:41
// 소요시간: 01:07

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
3 4 0
64 64 64 64
64 64 64 64
64 64 64 63
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const [N, M, B] = input();
const land = Array.from({ length: N }, () => input())
  .flat()
  .sort((a, b) => a - b);

let low = land.at(0);
let high = land.at(-1);
let time = 0;
let inventory = B;
const lastLandIdx = land.length - 1;

const isSameHeight = (a, b) => a === b;
const getFillTimeIfCan = () => {
  let tmpInventory = inventory;
  let time = 0;
  const nextHeightIdx = land.findIndex(value => value !== low);
  const nextHeigh = land[nextHeightIdx];
  for (let i = 0; i < nextHeightIdx; i++) {
    tmpInventory -= nextHeigh - land[i];
    time++;
  }
  if (tmpInventory < 0) return Infinity;
  return time;
};

const getSliceTime = () => {
  let time = 0;
  const nextHeightIdx = land.indexOf(high) - 1;
  for (let i = lastLandIdx; i > nextHeightIdx; i--) {
    time += 2;
  }
  return time;
};

const fill = last => {
  for (let i = 0; i < last; i++) {
    land[i]++;
  }
  low++;
};

const slice = last => {
  for (let i = 0; i < last; i++) {
    land[lastLandIdx - i]--;
  }
  high--;
};

// **. 놓음 -> 1초
// **. 제거후 인벤토리로 -> 2초

// 1. 맨아래와 맨위 높이가 같은지 봄
// 2. 제일 낮은칸을 채울 수 있다면 시간을 가져옴, Infinity 이라면 블록 모자라서 채울 수 없음.
// 3. 채울 수 있다면 맨위 자르는 시간, 아래부터 채우는 시간을 비교함
// 4. 더 적게 걸리는 방법을 선택함
// 5. 만약 둘의 시간이 같다면 채우는쪽을 선택함.
// 6. 채울 수 없다면 그냥 맨위를 자름
while (low !== high) {
  const fillTime = getFillTimeIfCan();
  const sliceTime = getSliceTime();

  if (sliceTime < fillTime) {
    const blockCountNum = sliceTime / 2;
    inventory += blockCountNum;
    time += sliceTime;
    slice(blockCountNum);
  } else {
    const blockCountNum = fillTime;
    inventory -= blockCountNum;
    time += fillTime;
    fill(blockCountNum);
  }
}

console.log([time, high]);
