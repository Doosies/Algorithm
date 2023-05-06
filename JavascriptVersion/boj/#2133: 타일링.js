const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = +stdin[0];
const dp = Array(31).fill(0);
dp[2] = 3;

for (let i = 4; i <= N; i += 2) {
  dp[i] += dp[i - 2] * 3 + 2;
  for (let j = i - 4; j > 0; j -= 2) {
    dp[i] += dp[j] * 2;
  }
}
console.log(dp[N]);
