class Nodee {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
class Queue {
  head;
  tail;
  size = 0;
  isEmpty() {
    return this.head ? false : true;
  }
  push(data) {
    const node = new Nodee(data, null);
    if (this.head) this.tail.next = node;
    else this.head = node;

    this.tail = node;
  }
  pop() {
    if (!this.head) return undefined;
    const result = this.head.value;
    this.head = this.head.next;
    return result;
  }
}

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
5
4 3
####
#*@.
####
7 6
###.###
#*#.#*#
#.....#
#.....#
#..@..#
#######
7 4
###.###
#....*#
#@....#
.######
5 5
.....
.***.
.*@*.
.***.
.....
3 3
###
#@#
###
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return (isStr) => stdin[l++].split(isStr ? '': ' ')})();

const next = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const isGoal = (h, w, y, x) => y < 0 || y >= h || x < 0 || x >= w;

const insertQueue = (board, q, h, w) => {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === '*') q.push([i, j, -1]);
    }
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === '@') q.push([i, j, 0]);
    }
  }
};

const solution = (board, h, w) => {
  const q = new Queue();

  insertQueue(board, q, h, w);
  // console.log(q);
  while (!q.isEmpty()) {
    const [y, x, time] = q.pop();

    for (const [yy, xx] of next) {
      const [ny, nx] = [y + yy, x + xx];
      if (isGoal(h, w, ny, nx)) {
        if (time < 0) continue;
        return time + 1;
      }
      if (board[ny][nx] !== '.') continue;
      board[ny][nx] = 'X';
      q.push([ny, nx, time < 0 ? -1 : time + 1]);
    }
  }
  return 'IMPOSSIBLE';
};
const T = +input();
for (let test = 0; test < T; test++) {
  const [w, h] = input().map(Number);
  const board = Array.from({ length: h }, () => input(true));
  const result = solution(board, h, w);
  console.log(result);
}
