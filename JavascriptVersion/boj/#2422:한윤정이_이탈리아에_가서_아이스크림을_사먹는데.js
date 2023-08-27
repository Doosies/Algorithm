// 문제링크: https://www.acmicpc.net/problem/2422
// 시작날짜: 2023.08.27
// 시작시간: 15:37
// 종료시간: 16:06
// 소요시간: 00:29

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
5 3
1 2
3 4
1 3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, M] = input();
const noCombi = {};

for (let i = 0; i < M; i++) {
  const [a, b] = input();

  if (noCombi[a]) noCombi[a].push(b);
  else noCombi[a] = [b];

  if (noCombi[b]) noCombi[b].push(a);
  else noCombi[b] = [a];
}

function combi(now = 1, arr = [], result = 0) {
  if (arr.length === 3) return 1;

  for (let i = now; i < N + 1; i++) {
    if (arr.some(el => noCombi[i]?.some(no => no === el))) continue;
    result += combi(i + 1, [...arr, i]);
  }

  return result;
}

console.log(combi());
