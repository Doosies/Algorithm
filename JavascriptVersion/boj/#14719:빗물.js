//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
3 5
0 0 0 2 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [H, W] = input();
const h = input();
const board = Array.from({ length: H }, () => Array.from({ length: W }, () => 0));

for (let i = 0; i < W; i++) {
  const nowH = H - h[i];
  for (let j = nowH; j < H; j++) {
    board[j][i] = 1;
  }
}

let result = 0;
for (let i = 0; i < H; i++) {
  let wall = false;
  let resultTmp = 0;
  for (let j = 0; j < W; j++) {
    if (board[i][j] === 1) {
      wall = true;
    }
    if (wall && board[i][j] === 0) {
      resultTmp++;
    }
    if (wall && board[i][j] === 1) {
      result += resultTmp;
      resultTmp = 0;
    }
  }
}

console.log(result);
