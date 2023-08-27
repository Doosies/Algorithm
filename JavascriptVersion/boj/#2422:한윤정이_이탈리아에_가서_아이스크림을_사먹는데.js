// 문제링크: https://www.acmicpc.net/problem/2422
// 시작날짜: 2023.08.27
// 시작시간: 15:37
// 종료시간: 16:06
// 소요시간: 00:29

// 성능개선: 16:18 (720ms -> 248ms)
// 소요시간: 00:12

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
const noCombi = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => false));
let result = 0;

for (let i = 0; i < M; i++) {
  const [a, b] = input();
  noCombi[a][b] = true;
  noCombi[b][a] = true;
}

for (let i = 1; i < N + 1; i++) {
  for (let j = i + 1; j < N + 1; j++) {
    if (noCombi[i][j]) continue;

    for (let k = j + 1; k < N + 1; k++) {
      if (noCombi[i][k] || noCombi[j][k]) continue;
      result++;
    }
  }
}

console.log(result);
