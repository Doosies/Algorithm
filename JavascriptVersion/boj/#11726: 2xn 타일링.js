//prettier-ignore
const stdin = (process.platform === 'linux'? require('fs').readFileSync(0, 'utf-8'): `
2
`).trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const N = +input();
const dp = Array(1001).fill(0);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[N]);
