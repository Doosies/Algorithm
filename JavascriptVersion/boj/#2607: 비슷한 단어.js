const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3
DOG
DOLL
GOD
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = +input();
const word = input();
let ans = 0;

for (let i = 0; i < N - 1; i++) {
  const inp = input();
  let copy = word;
  let no = 0;

  for (w of inp) {
    if (copy.includes(w)) {
      copy = copy.replace(w, '');
    } else {
      no++;
    }
  }

  // 틀린 부분이 2개 미만 && 문자열 길이차 1 미만
  if (no < 2 && copy.length < 2) ans++;
}

console.log(ans);
