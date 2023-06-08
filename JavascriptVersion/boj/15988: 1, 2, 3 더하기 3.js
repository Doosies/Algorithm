//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
3
4
7
10
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => +stdin[l++];})();

const T = input();
const nums = Array.from({ length: T }, () => input());
const dp = Array.from({ length: 1000000 }, () => 0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let n = 4; n < 1000001; n++) {
  dp[n] = (dp[n - 1] + dp[n - 2] + dp[n - 3]) % 1000000009;
}

for (const num of nums) {
  console.log(dp[num]);
}
