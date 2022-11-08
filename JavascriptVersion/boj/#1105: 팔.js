const stdin = (process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8') : `128 138`).trim().split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => v);
})();

const [L, R] = input();
let cnt = 0;

if (L.length === R.length) {
  for (let i = 0; i < L.length; i++) {
    if (L[i] === R[i] && L[i] === '8') {
      cnt++;
    } else if (L[i] !== R[i]) break;
  }
}
console.log(cnt);
