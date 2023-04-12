const fs = require('fs');
const stdin = (process.platform === 'linux' ? fs.readFileSync(0, 'utf-8') : `5 4 3 2`).trim().split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const [H, W, N, M] = input();

const seatW = Math.ceil(W / (M + 1));
const seatH = Math.ceil(H / (N + 1)) * seatW;

console.log(seatH);
