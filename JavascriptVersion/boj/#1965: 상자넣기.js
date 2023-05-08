//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
8
9 7 7 7 7 7 7 7
`.trim().split('\n');

const N = +stdin[0];
const L = stdin[1].split(' ').map(Number);
const dp = Array(N).fill(1);

for (let i = 1; i < N; i++) {
  for (let j = i; j >= 0; j--) {
    if (L[j] < L[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(Math.max(...dp));
