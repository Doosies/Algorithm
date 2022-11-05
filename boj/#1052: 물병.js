const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `1000000 5
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

let [n, k] = input();
let cnt = 0;

const countTwo = num =>
  num
    .toString(2)
    .split('')
    .filter(e => e === '1').length;
const findZero = num => {
  return num.toString(2).split('').reverse().indexOf('1');
};

while (countTwo(n) > k) {
  const zeroPos = findZero(n);
  n += 2 ** zeroPos;
  cnt += 2 ** zeroPos;
}
console.log(cnt);
