const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
4 7
6 13
4 8
3 6
5 12
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

// const [N, K] = input();
// const dp = Array(K + 1).fill(0);

// for (let i = 0; i < N; i++) {
//   const [W, V] = input();
//   for (let j = K; j >= W; j--) {
//     if (dp[j - W] + V > dp[j]) {
//       dp[j] = dp[j - W] + V;
//     }
//   }
// }

// console.log(dp[K]);

const [N, K] = input();
const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

for (let i = 1; i < N + 1; i++) {
  const [W, V] = input();
  for (let j = 1; j <= K; j++) {
    if (j - W >= 0) dp[i][j] = Math.max(dp[i - 1][j - W] + V, dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp[N][K]);
// console.log(dp);

// dp[7] = max(dp[7 - 2] + 3, dp[7]);
// dp[6] = max(dp[6 - 2] + 3, dp[6]);
// dp[5] = max(dp[5 - 2] + 3, dp[5]);
// dp[4] = max(dp[4 - 2] + 3, dp[4]);
// dp[3] = max(dp[3 - 2] + 3, dp[3]);
// dp[2] = max(dp[2 - 2] + 3, dp[2]);
