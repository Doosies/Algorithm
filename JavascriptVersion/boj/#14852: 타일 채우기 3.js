//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `5`.trim().split('\n');
const N = +stdin[0];
const dp = Array(1_000_001).fill(0);
const memo = [0, 4, 18];
dp[1] = 2;
dp[2] = 7;

for (let i = 3; i <= N; i++) {
  const calc = dp[i - 1] * 2 + dp[i - 2] * 3 + memo[i - 3] + 2;
  dp[i] = calc % 1_000_000_007;
  memo[i] = (memo[i - 1] + dp[i] * 2) % 1_000_000_007;
}

console.log(dp[N]);
