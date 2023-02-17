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

const [N, K] = input();
const dp = Array(K + 1).fill(0);

for (let i = 0; i < N; i++) {
  const [W, V] = input();
  for (let j = K; j >= W; j--) {
    if (dp[j - W] + V > dp[j]) {
      dp[j] = dp[j - W] + V;
    }
  }
}

console.log(dp[K]);
