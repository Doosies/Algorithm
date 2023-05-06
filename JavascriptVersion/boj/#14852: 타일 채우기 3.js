//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `5`.trim().split('\n');
const N = +stdin[0];
const dp = Array(1_000_001).fill(0);
const memo = [2, 6, 20]; // 원래는 [0, 4, 18] 이지만 유니크 패턴 2를 더해서 왼쪽과 같음
dp[1] = 2;
dp[2] = 7;

for (let i = 3; i <= N; i++) {
  const calc = dp[i - 1] * 2 + dp[i - 2] * 3 + memo[i - 3];
  const memoCalc = memo[i - 1] + dp[i] * 2;

  dp[i] = calc % 1_000_000_007;
  memo[i] = memoCalc % 1_000_000_007;
}

console.log(dp[N]);
