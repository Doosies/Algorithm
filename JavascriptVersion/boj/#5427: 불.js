// class Queue {
//   l = 0;
//   r = 0;
//   q = {};
//   isEmpty() {
//     return this.l === this.r;
//   }
//   push(data) {
//     this.q[this.r++] = data;
//   }
//   pop() {
//     if (this.isEmpty()) return undefined;
//     const result = this.q[this.l];
//     delete this.q[this.l++];
//     return result;
//   }
// }

// //const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// //prettier-ignore
// const stdin = `
// 5
// 4 3
// ####
// #*@.
// ####
// 7 6
// ###.###
// #*#.#*#
// #.....#
// #.....#
// #..@..#
// #######
// 7 4
// ###.###
// #....*#
// #@....#
// .######
// 5 5
// .....
// .***.
// .*@*.
// .***.
// .....
// 3 3
// ###
// #@#
// ###
// `.trim().split('\n');
// //prettier-ignore
// const input = (() => { let l = 0; return (isStr) => stdin[l++].split(isStr ? '': ' ')})();

// const next = [
//   [1, 0],
//   [-1, 0],
//   [0, 1],
//   [0, -1],
// ];

// const isGoal = (h, w, y, x) => y < 0 || y >= h || x < 0 || x >= w;
// const isInBoard = (h, w, y, x) => y >= 0 && y < h && x >= 0 && x < w;
// const getNowPos = (board, h, w) => {
//   for (let i = 0; i < h; i++) {
//     for (let j = 0; j < w; j++) {
//       if (board[i][j] === '@') {
//         return [i, j];
//       }
//     }
//   }
// };
// const getFiredBoard = (board, h, w) => {
//   const fireQ = new Queue();

//   // 최초 불 위치 큐에 넣음
//   for (let i = 0; i < h; i++) {
//     for (let j = 0; j < w; j++) {
//       if (board[i][j] === '*') {
//         fireQ.push([i, j, 0]);
//       }
//     }
//   }

//   while (!fireQ.isEmpty()) {
//     const [y, x, cnt] = fireQ.pop();

//     for (const [yy, xx] of next) {
//       const [ny, nx] = [y + yy, x + xx];
//       // 보드밖이면 불이 이동 못함
//       if (!isInBoard(h, w, ny, nx)) continue;
//       if (board[ny][nx] !== '.') continue;

//       board[ny][nx] = cnt + 1;
//       fireQ.push([ny, nx, cnt + 1]);
//     }
//   }

//   return board;
// };

// const solution = (board, h, w) => {
//   const [py, px] = getNowPos(board, h, w);
//   const visited = Array.from({ length: h }, () => Array.from({ length: w }, () => false));
//   // 불을 bfs로 옮김.
//   // 만약 빈 공간일 경우에만 옮길 수 있음.
//   const firedBoard = getFiredBoard(board, h, w);
//   const playerQueue = new Queue();

//   playerQueue.push([py, px, 0]);
//   visited[py][px] = true;
//   // 플레이어는 보드에서 현재 숫자보다 큰곳(나중에 불 붙을곳)으로만 이동할 수 있음.

//   while (!playerQueue.isEmpty()) {
//     const [y, x, time] = playerQueue.pop();
//     if (isGoal(h, w, y, x)) return time;

//     for (const [yy, xx] of next) {
//       const [ny, nx] = [y + yy, x + xx];

//       if (isGoal(h, w, ny, nx)) return time + 1;

//       if (visited[ny][nx]) continue;

//       if (firedBoard[ny][nx] > time + 1 || firedBoard[ny][nx] === '.') {
//         playerQueue.push([ny, nx, time + 1]);
//         visited[ny][nx] = true;
//       }
//     }
//   }ㅌ
//   return 'IMPOSSIBLE';
// };

// const T = +input();
// for (let test = 0; test < T; test++) {
//   const [w, h] = input().map(Number);
//   const board = Array.from({ length: h }, () => input(true));
//   const result = solution(board, h, w);
//   console.log(result);
// }

class Queue {
  l = 0;
  r = 0;
  q = {};
  isEmpty() {
    return this.l === this.r;
  }
  push(data) {
    this.q[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.q[this.l];
    delete this.q[this.l++];
    return result;
  }
  size() {
    return this.r - this.l;
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
