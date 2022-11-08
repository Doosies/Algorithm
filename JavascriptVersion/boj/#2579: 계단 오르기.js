const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `6
    10
    20
    15
    25
    10
    20
    `
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => +stdin[line++]; //.split(" ").map((v) => +v);
})();

function solution(N, stairs) {
  const dp = [
    stairs[0],
    stairs[0] + stairs[1],
    Math.max(stairs[0], stairs[1]) + stairs[2],
  ];

  for (let i = 3; i < stairs.length; i++) {
    const a = dp[i - 3] + stairs[i - 1] + stairs[i];
    const b = dp[i - 2] + stairs[i];
    dp[i] = Math.max(a, b);
  }

  if (N === 1) return stairs[0];
  if (N === 2) return stairs[0] + stairs[1];
  return dp.at(-1);
}

const N = input();
const stairs = Array.from({ length: N }, () => input());
const result = solution(N, stairs);
console.log(result);
