//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
6 6
3
3
3
3
3
2
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, Q] = input();
const own = Array(N + 1).fill(false);
const ducks = Array.from({ length: Q }, () => +input());
let ans = '';

const findTree = pos => {
  const firstOwn = pos;
  let lastOwn = 0;

  while (pos > 1) {
    if (own[pos]) lastOwn = pos;
    pos = Math.floor(pos / 2);
  }

  ans += `${lastOwn}\n`;
  own[firstOwn] = true;
};

ducks.forEach(duck => {
  findTree(duck);
});

console.log(ans.trim());
