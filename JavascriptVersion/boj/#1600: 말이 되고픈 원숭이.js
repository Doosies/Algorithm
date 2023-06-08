class Q {
  l = 0;
  r = 0;
  q = {};
  isEmpty = () => this.l === this.r;
  push(d) {
    this.q[this.r++] = d;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const r = this.q[this.l];
    delete this.q[this.l++];
    return r;
  }
}
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
2
5 2
0 0 1 1 0
0 0 1 1 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const K = +input();
const [W, H] = input();
const board = Array.from({ length: H }, () => input());
const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Array.from({ length: K }, () => false)),
);
// console.log(visited, W, H, K);
// k번만 말처럼 움직일수있음.
// 그 외에는 인접한 칸으로 움직일 수 있음 ( 상, 하, 좌, 우)

const moveHorse = [
  [-2, 1],
  [-2, -1],
  [-1, 2],
  [-1, -2],
  [1, 2],
  [1, -2],
  [2, 1],
  [2, -1],
];
const moveMonkey = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const canGo = (y, x) => y >= 0 && y < H && x >= 0 && x < W && board[y][x] !== 1;

const queue = new Q();
queue.push([0, 0, 0, 0]);

while (!queue.isEmpty()) {
  const [y, x, k, m] = queue.pop();

  if (y === H - 1 && x === W - 1) {
    console.log(m);
    return;
  }
  // 말처럼 가보는 경우
  for (const [yy, xx] of moveHorse) {
    const [ny, nx] = [y + yy, x + xx];
    if (!canGo(ny, nx)) continue;
    if (k + 1 > K) continue;
    if (visited[ny][nx][k + 1]) continue;

    queue.push([ny, nx, k + 1, m + 1]);
    visited[ny][nx][k + 1] = true;
  }
  // 원숭이처럼 가보는 경우
  for (const [yy, xx] of moveMonkey) {
    const [ny, nx] = [y + yy, x + xx];
    if (!canGo(ny, nx)) continue;
    if (visited[ny][nx][k]) continue;

    queue.push([ny, nx, k, m + 1]);
    visited[ny][nx][k] = true;
  }
}
console.log(-1);
