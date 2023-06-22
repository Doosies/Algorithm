//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
11 12 2 24 10
16 1 13 3 25
6 20 5 21 17
19 4 8 14 9
22 15 7 23 18
5 10 7 16 2
4 22 8 17 13
3 18 1 6 25
12 19 23 14 21
11 24 9 20 15
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const board1 = Array.from({ length: 5 }, () => input());
const board2 = Array.from({ length: 5 }, () => input());
const coordinates = {};

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const val = board1[i][j];
    coordinates[val] = [i, j];
  }
}

const isBingo = () => {
  let bingo = 0;
  // X, T 축 검색
  for (let i = 0; i < 5; i++) {
    let cntY = 0;
    let cntX = 0;
    for (let j = 0; j < 5; j++) {
      if (board1[j][i] === 'X') cntY++;
      if (board1[i][j] === 'X') cntX++;
    }
    if (cntY === 5) bingo++;
    if (cntX === 5) bingo++;
  }

  // 대각선 검색
  let cntLR = 0;
  let cntRL = 0;
  for (let i = 0; i < 5; i++) {
    if (board1[i][i] === 'X') cntLR++;
    if (board1[i][4 - i] === 'X') cntRL++;
  }
  if (cntLR === 5) bingo++;
  if (cntRL === 5) bingo++;

  return bingo >= 3 ? true : false;
};

let cnt = 0;
for (const row of board2) {
  for (const col of row) {
    const [y, x] = coordinates[col];
    board1[y][x] = 'X';
    cnt++;
    if (isBingo()) {
      console.log(cnt);
      return;
    }
  }
}
