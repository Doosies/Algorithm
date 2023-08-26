// 문제링크: https://www.acmicpc.net/problem/11909
// 시작날짜: 2023.08.26
// 시작시간: 10:56
// 종료시간: 12:20
// 소요시간: 01:36
// bfs로 풀려 했는데 메모리초과 -> dp로 시도

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
5
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const N = +input();
const board = Array.from({ length: N }, () => input());
const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));
const isInBoard = (y, x) => y >= 0 && y < N && x >= 0 && x < N;
dp[0][0] = 0;

const getBefore = (y, x, orgY, orgX) => {
  if (!isInBoard(y, x)) return Infinity;
  // 0보다 작으면 dp 그대로 옮김
  const differ = board[orgY][orgX] - board[y][x];

  if (differ < 0) {
    return dp[y][x];
  }
  // 0 이상이면 현재 - 이전 + 1 + 이전dp 더함
  else {
    return differ + 1 + dp[y][x];
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i === 0 && j === 0) continue;

    let up = getBefore(i - 1, j, i, j);
    let left = getBefore(i, j - 1, i, j);

    dp[i][j] = Math.min(up, left);
  }
}

console.log(dp[N - 1][N - 1]);
