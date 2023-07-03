// 문제링크: https://www.acmicpc.net/problem/17070
// 시작날짜: 2023.07.03
// 시작시간: 14:41
// 종료시간: 15:29
// 소요시간: 00:48

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
6
0 0 0 0 0 0
0 1 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const N = +input();
const board = Array.from({ length: N }, () => input());
// 왼쪽, 대각선, 위에서 온걸 각각 저장해야함.
// 0: 왼쪽, 1: 위, 2: 대각선
const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => [0, 0, 0]));

// 처음 맨위 가로줄은 벽을 만나기 전까지 1로 채워줌
for (let i = 1; i < N; i++) {
  if (board[0][i] === 1) break;
  dp[0][i][0] = 1;
}

for (let i = 1; i < N; i++) {
  for (let j = 1; j < N; j++) {
    if (board[i][j] === 1) continue;

    // (0) 왼쪽에서 오는거: 왼쪽의 대각선, 왼쪽의 왼쪽에서 온걸 더해줌
    dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];
    // (1) 위에서 오는거: 위의 대각선, 위의 위에서 온거 더해줌
    dp[i][j][1] = dp[i - 1][j][1] + dp[i - 1][j][2];

    if (board[i - 1][j] === 0 && board[i][j - 1] === 0) {
      // (2) 대각선에서 오는거: 대각선의 왼쪽, 대각선의 세로, 대각선의 대각선 더해줌
      dp[i][j][2] = dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
    }
  }
}

const result = dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2];
console.log(result);
