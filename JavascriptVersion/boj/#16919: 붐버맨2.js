const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
2 2 1
O.
.O
`
)
  .trim()
  .split('\n');
let line = 0;
const input = isSpace => {
  return () => stdin[line++].split(isSpace ? ' ' : '').map(v => v);
};

const spaceInput = input(true);
const justInput = input(false);

// R: 세로, C: 가로
const [R, C, N] = spaceInput();
const firstBoard = Array.from({ length: R }, () => justInput());
const secondBoard = Array.from({ length: R }, () => Array.from({ length: C }, () => 'O'));
const thirdBoard = Array.from({ length: R }, () => Array.from({ length: C }, () => 'O'));
const zeroBoard = Array.from({ length: R }, () => Array.from({ length: C }, () => 'O'));

const isInBoard = (y, x) => y >= 0 && y < R && x >= 0 && x < C;

const bomb = (original, change) => {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (original[i][j] === 'O') {
        [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [0, 0],
        ].forEach(([y, x]) => {
          const [ny, nx] = [i + y, j + x];
          if (isInBoard(ny, nx)) {
            change[ny][nx] = '.';
          }
        });
      }
    }
  }
};

bomb(firstBoard, secondBoard);
bomb(secondBoard, thirdBoard);

const print = board => {
  board.forEach(row => {
    console.log(row.join(''));
  });
};

if (+N === 1) {
  print(firstBoard);
} else if (+N % 2 === 0) {
  print(zeroBoard);
} else if (+N % 4 === 3) {
  print(secondBoard);
} else {
  print(thirdBoard);
}
