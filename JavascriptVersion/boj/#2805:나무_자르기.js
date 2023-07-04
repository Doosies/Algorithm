// 문제링크: https://www.acmicpc.net/problem/2805
// 시작날짜: 2023.07.04
// 시작시간: 13:35
// 종료시간: 13:48
// 소요시간: 00:13

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
5 20
4 42 40 26 46
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const [N, M] = input();
const trees = input();

let left = 1;
let right = Math.max(...trees);

const cutTreesLen = h =>
  trees.reduce((sum, now) => {
    const tree = now - h;
    return (sum += tree >= 0 ? tree : 0);
  }, 0);

while (left <= right) {
  const mid = ~~((left + right) / 2);
  // M 나무를 수확할 수 있는 길이중 가장
  // 자른거 >= M 이라면 left = mid - 1
  // 자른거 < M 이라면 right = mid + 1
  if (cutTreesLen(mid) >= M) left = mid + 1;
  else right = mid - 1;
}
console.log(right);
