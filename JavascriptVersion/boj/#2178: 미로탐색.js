const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
4 6
110110
110110
111111
111101
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ');
})();

const split = array => array.toString().split('').map(Number);

const [N, M] = input().map(Number);
const board = Array.from({ length: N }, () => split(input()));

const isInBoard = (y, x) => (y >= 0 && y < N && x >= 0 && x < M ? true : false);
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
const queue = [[0, 0, 1]];
const next = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

while (queue.length) {
  const [y, x, m] = queue.shift();

  if (y === N - 1 && x === M - 1) {
    console.log(m);
    break;
  }

  for (let [my, mx] of next) {
    const [ny, nx] = [y + my, x + mx];
    if (!isInBoard(ny, nx)) continue;
    if (board[ny][nx] === 0) continue;
    if (visited[ny][nx]) continue;

    visited[ny][nx] = true;
    queue.push([ny, nx, m + 1]);
  }
}
