// 풀인날짜: 23.06.22
// 시작시간: 15:45
// 종료시간: 16:28
// 소요시간: 00:43

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
5 4 7
1 2 3 4
7 8 9 10
13 14 15 16
19 20 21 22
25 26 27 28
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, M, R] = input();
const board = Array.from({ length: N }, () => input());
const circleCnt = Math.ceil(Math.min(N, M) / 2);

const move = (y, x, yy, xx) => {
  board[y][x] = board[yy][xx];
  // [board[y][x], board[yy][xx]] = [board[yy][xx], board[y][x]];
};
for (let loop = 0; loop < R; loop++) {
  for (let circle = 0; circle < circleCnt; circle++) {
    const start = circle;
    const y = N - 1 - circle;
    const x = M - 1 - circle;
    const tmp = board[start][start];

    for (let i = start; i < x; i++) move(start, i, start, i + 1);
    for (let i = start; i < y; i++) move(i, x, i + 1, x);
    for (let i = x; i > start; i--) move(y, i, y, i - 1);
    for (let i = y; i > start + 1; i--) move(i, start, i - 1, start);

    board[start + 1][start] = tmp;
  }
}

console.log(board.map(row => row.join(' ')).join('\n'));
