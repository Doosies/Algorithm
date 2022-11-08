const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3
1 2 3
4 5 6
4 9 0`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const N = +input();
const board = Array.from({ length: N }, () => input());
const max = Array.from({ length: N }, () => Array.from({ length: 3 }, () => 0));
const min = Array.from({ length: N }, () => Array.from({ length: 3 }, () => 0));

max[0] = [...board[0]];
min[0] = [...board[0]];

for (let i = 1; i < N; i++) {
  max[i][0] = Math.max(max[i - 1][0], max[i - 1][1]) + board[i][0];
  max[i][1] = Math.max(...max[i - 1]) + board[i][1];
  max[i][2] = Math.max(max[i - 1][1], max[i - 1][2]) + board[i][2];

  min[i][0] = Math.min(min[i - 1][0], min[i - 1][1]) + board[i][0];
  min[i][1] = Math.min(...min[i - 1]) + board[i][1];
  min[i][2] = Math.min(min[i - 1][1], min[i - 1][2]) + board[i][2];
}

console.log(Math.max(...max.at(-1)), Math.min(...min.at(-1)));
