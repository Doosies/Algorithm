const fs = require('fs');
const stdin = fs.readFileSync(0, 'utf-8').trim().split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const before = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const isInBoard = (y, x, N) => y >= 0 && y < N && x >= 0 && x < N;
let cnt = 1;

while (true) {
  const N = +input();
  if (N === 0) return;

  const board = Array.from({ length: N }, () => input());
  const dist = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));
  dist[0][0] = board[0][0];

  const h = [[0, 0]];

  while (h.length) {
    const [y, x] = h.shift();

    for (let [my, mx] of before) {
      const [ny, nx] = [y + my, x + mx];
      if (!isInBoard(ny, nx, N)) continue;

      if (dist[ny][nx] > board[ny][nx] + dist[y][x]) {
        h.push([ny, nx]);
        dist[ny][nx] = board[ny][nx] + dist[y][x];
      }
    }
  }

  console.log(`Problem ${cnt++}: ${dist[N - 1][N - 1]}`);
}
