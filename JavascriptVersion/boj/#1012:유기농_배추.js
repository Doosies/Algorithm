// 문제링크: https://www.acmicpc.net/problem/1012
// 시작날짜: 2023.08.27
// 시작시간: 14:20
// 종료시간: 14:38
// 소요시간: 00:18

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const T = +input();
const next = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

for (let i = 0; i < T; i++) {
  const [M, N, K] = input();
  const board = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
  let result = 0;

  for (let i = 0; i < K; i++) {
    const [X, Y] = input();
    board[Y][X] = 1;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j] && board[i][j] === 1) {
        result++;
        dfs(i, j, board, visited, N, M);
      }
    }
  }

  console.log(result);
}

function dfs(y, x, board, visited, N, M) {
  if (visited[y][x]) return;
  visited[y][x] = true;

  for (const [yy, xx] of next) {
    const [ny, nx] = [yy + y, xx + x];

    if (ny < 0 || ny >= N || nx < 0 || nx >= M) {
      continue;
    }

    if (board[ny][nx] === 1) {
      dfs(ny, nx, board, visited, N, M);
    }
  }
}
