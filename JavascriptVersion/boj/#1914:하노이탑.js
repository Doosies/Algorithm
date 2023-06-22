//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => +stdin[l++];})();

const N = input();

const hanoi = (n, start, end, mid) => {
  if (n === 1) {
    console.log(1, start, end);
    return;
  }

  hanoi(n - 1, start, mid, end);
  console.log(n, start, end);
  hanoi(n - 1, mid, end, start);
};

hanoi(3, 'A', 'C', 'B');
