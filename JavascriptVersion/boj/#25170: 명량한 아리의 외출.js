const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
6 5 15
0 2 1 3 1
3 1 4 2 2
1 4 1 3 1
2 1 4 1 7
1 3 2 3 1
4 1 1 5 0
0 1 3 2 5
4 3 5 2 3
1 2 2 2 1
3 1 2 1 2
1 3 1 2 1
3 2 1 1 0
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const [N, M, T] = input();
const dp = Array.from({ length: N }, () => Array.from({ length: M }, () => Array.from({ length: T + 1 }, () => -1)));
const work = [];
const time = [];

const direction = [
  [-1, -1], //대각선
  [-1, 0], //위
  [0, -1], //왼쪽
];
const isInBoard = (y, x) => {
  if (y >= 0 && y < N && x >= 0 && x < M) return true;
  return false;
};

for (let i = 0; i < N; i++) {
  work.push(input());
}
for (let i = 0; i < N; i++) {
  time.push(input());
}

dp[0][0][0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i === 0 && j === 0) continue;

    for (let k = 1; k <= T; k++) {
      for (let [y, x] of direction) {
        const [by, bx] = [i + y, j + x];

        if (!isInBoard(by, bx)) continue;

        const t = time[by][bx];
        const w = work[by][bx];

        dp[i][j][k] = Math.max(
          // 현재
          dp[i][j][k],
          // 일을 안했을때
          dp[by][bx][k - 1],
          // 일을 했을 때
          k - t - 1 >= 0 && dp[by][bx][k - t - 1] !== -1 ? dp[by][bx][k - t - 1] + w : -1,
        );
      }
    }
  }
}

console.log(Math.max(...dp[N - 1][M - 1]));
