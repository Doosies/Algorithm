const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
2
3 5
3 5
    `
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const solution = () => {
  const N = +input();
  // works[0] = 시간, works[1] = 이때까지 끝내야함.
  const works = Array.from({ length: N }, () => input());
  let time = 1000001;
  works.sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < works.length; i++) {
    if (time > works[i][1]) time = works[i][1] - works[i][0];
    else time -= works[i][0];
    if (time < 1) return -1;
  }
  return time;
};
console.log(solution());
