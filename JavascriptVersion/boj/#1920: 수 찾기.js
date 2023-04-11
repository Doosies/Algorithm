const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
5
4 1 5 2 3
5
1 3 7 9 5
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => v);
})();

const N = +input();
const A = input();
const M = +input();
const B = input();

const obj = {};
A.forEach(v => (obj[v] = true));

let ans = '';

B.forEach(v => {
  let a = 0;
  if (obj[v]) a = 1;

  ans += `${a}\n`;
});

console.log(ans.trim());
