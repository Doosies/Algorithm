// 문제링크:
// 시작날짜: 2023.07.04
// 시작시간: 12:05
// 종료시간: 12:59
// 소요시간: 00:54

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
4 5
2
1
3
100
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [K, N] = input();
const cables = Array.from({ length: K }, () => +input());
const sumCutCable = len => cables.reduce((sum, now) => (sum += Math.floor(now / len)), 0);

let left = 1;
let right = Math.max(...cables);

// 랜선길이를 길게 잘라야 한다 = N에 최대한 근접해야한다.
// 잘랐을 때 N개이상 나오는것중 제일 큰수

// console.log(sumCutCable(5));
// sum >= N -> mid + 1 ~ right 검색
// sum < N  -> left ~ mid - 1 검색
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (sumCutCable(mid) >= N) left = mid + 1;
  else right = mid - 1;
}

console.log(right);
