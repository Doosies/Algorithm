const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3
1 1 10
1 5 1
2 2 -1
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const N = +input();
const board = Array.from({ length: N }, () => input());
const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false),
);
const canMoveNext = (y, x) => {
  if (y >= 0 && y < N && x >= 0 && x < N) return true;
  return false;
};
let canGo = false;

const dfs = (y = 0, x = 0) => {
  if (visited[y][x]) {
    return;
  }
  if (y === N - 1 && x === N - 1) {
    canGo = true;
    return;
  }
  const jump = board[y][x];

  visited[y][x] = true;
  if (canMoveNext(y, x + jump)) {
    dfs(y, x + jump);
  }
  if (canMoveNext(y + jump, x)) {
    dfs(y + jump, x);
  }
};

dfs();
console.log(canGo ? 'HaruHaru' : 'Hing');
