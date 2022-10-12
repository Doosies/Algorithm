const stdin = (
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8")
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
  .split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(" ").map(Number);
})();

const [N, M, T] = input();
const direction = [
  [-1, -1], //대각선
  [-1, 0], //위
  [0, -1], //왼쪽
];
// 보드 바깥을 벗어나지 않는지 확인하는 함수
const isInBoard = (y, x) => {
  if (y >= 0 && y < N && x >= 0 && x < M) return true;
  return false;
};
const board = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [])
);
const dp = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array(T + 1).fill(-1))
);

// 입력부분
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < N; j++) {
    const inp = input();
    for (let k = 0; k < M; k++) {
      board[j][k].push(inp[k]);
    }
  }
}
dp[0][0][0] = 0;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    // 첫칸은 거름
    if (y == 0 && x === 0) continue;

    for (let t = 1; t <= T; t++) {
      // 왼쪽, 대각선, 위방향 탐색
      direction.forEach(([ny, nx]) => {
        const [py, px] = [y + ny, x + nx];
        // 만약 해당 방향에서 현재 방향으로 올 수 있다면
        if (isInBoard(py, px)) {
          const beforeDp = dp[py][px];
          const [beforeWork, beforeTime] = board[py][px];
          const calcTime = t - 1 - beforeTime;

          // 일은 한경우
          dp[y][x][t] = Math.max(
            dp[y][x][t],
            calcTime >= 0 && beforeDp[calcTime] !== -1
              ? beforeDp[calcTime] + beforeWork
              : -1
          );
          // 일을 안할경우
          dp[y][x][t] = Math.max(dp[y][x][t], beforeDp[t - 1]);
        }
      }); // 왼쪽, 대각선, 위방향 탐색 forEach 종료
    } // T 탐색 종료
  } // x 종료
} // y 종료

const result = Math.max(...dp[N - 1][M - 1]);
console.log(result);
