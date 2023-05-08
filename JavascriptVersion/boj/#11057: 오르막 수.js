// 16: 25 풀기 시작
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
3
`.trim().split('\n');
const N = +stdin[0];
const dp = Array(10).fill(1);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j < 10; j++) {
    dp[j] = (dp[j] + dp[j - 1]) % 10007;
  }
}
console.log(dp.at(-1))
//
// console.log(dp)
//prettier-ignore
// 0 = 1
// 1 = 10 => 1 + 0
// 2 = 55 ( 1 ~ 10 합) => 45 + 10
// 3 = 220 ( 55 + 220 합) => 210 + 10

// dp[i] = n일때 오르막수 개수

// 0 1 2 3 4 5 6 7 8 9
// 00 11 22 33 44 55 66 77 88 99
// dp[i-1] + dp[i-2] *

// 00 01 02 03 04 05 06 07 08 09
// 11 12 13 14 15 16 17 18 19
// 22 23 24 ...
// 33 34...
// ...
// 99
// 12 23 45 56 67 78 89

// i-1의 값들에 0~9 i를 만듬.
// xx0 xx1 xx2 xx3 xx4 xx5 xxs6 xx7 xx8 xx9
// xx1 xx2 ... xx9
//

// console.log(139583862445 % 10007);
// 000

// 001;
// 011;
// 111;

// 002;
// 012;
// 022;
// 222;

// 003;
// 013;
// 023;
// 033;
// 333;

// + 9 = 46개?

// 끝이 n 미만인것만 붙을수 있음.
