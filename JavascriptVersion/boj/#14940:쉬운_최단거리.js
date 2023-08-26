// 문제링크:
// 시작날짜: 2023.08.26
// 시작시간: 17:17
// 종료시간:
// 소요시간:

class Queue {
  L = 0;
  R = 0;
  D = {};
  push(d) {
    this.D[this.R++] = d;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const d = this.D[this.L];
    delete this.D[this.L++];
    return d;
  }
  isEmpty() {
    return this.L === this.R;
  }
}
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
3 5
0 1 1 1 2
1 1 1 0 0
1 1 1 0 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [n, m] = input();
const isInBoard = (y, x) => y >= 0 && y < n && x >= 0 && x < m;
const board = Array.from({ length: n }, () => input());
const dist = Array.from({ length: n }, () => Array.from({ length: m }, () => -1));
const q = new Queue();
const next = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 0) {
      dist[i][j] = 0;
    }
    if (board[i][j] === 2) {
      dist[i][j] = 0;
      q.push([i, j, 0]);
    }
  }
}

while (!q.isEmpty()) {
  const [y, x, cost] = q.pop();

  for (const [yy, xx] of next) {
    const [ny, nx] = [y + yy, x + xx];

    if (!isInBoard(ny, nx)) continue;
    if (board[ny][nx] === 0) continue;
    if (dist[ny][nx] !== -1 && dist[ny][nx] <= cost + 1) continue;

    dist[ny][nx] = cost + 1;
    q.push([ny, nx, cost + 1]);
  }
}

console.log(dist.map(row => row.join(' ')).join('\n'));
