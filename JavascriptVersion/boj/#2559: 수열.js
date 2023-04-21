//prettier-ignore
const stdin = (process.platform === 'linux'? require('fs').readFileSync(0, 'utf-8'): `
10 3
10 -2 -4 -9 0 3 -10 -200 8 -3
`).trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, K] = input();
const arr = input();

const dp = [arr[0]];
for (let i = 1; i < N; i++) {
  dp[i] = dp[i - 1] + arr[i];
}

let max = dp[K - 1];
for (let i = K; i < N; i++) {
  const num = dp[i] - dp[i - K];
  max = max < num ? num : max;
}
console.log(max);
