const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
7 3
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const [n, k] = input();
const arr = Array.from({ length: n }, (_, i) => i + 1);
const ans = [];
let pick = 0;

while (arr.length) {
  pick += k - 1;
  if (pick >= arr.length) pick %= arr.length;
  ans.push(+arr.splice(pick, 1));
}

console.log(`<${ans.join(', ')}>`);
