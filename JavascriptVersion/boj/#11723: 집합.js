const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
26
add 1
add 2
check 1
check 2
check 3
remove 2
check 1
check 2
toggle 3
check 1
check 2
check 3
check 4
all
check 10
check 20
toggle 10
remove 20
check 10
check 20
empty
check 1
toggle 1
check 1
toggle 1
check 1
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ');
})();

const M = +input();
let arr = parseInt('00000000000000000000', 2);

const add = x => (arr |= 1 << x);
const remove = x => (arr &= ~(1 << x));
const check = x => (arr & (1 << x) ? 1 : 0);
const toggle = x => (check(x) === 1 ? remove(x) : add(x));
const all = () => (arr = -1);
const empty = () => (arr = 0);

for (let i = 0; i < M; i++) {
  const [cmd, num] = input();

  switch (cmd) {
    case 'add':
      add(+num);
      break;
    case 'remove':
      remove(+num);
      break;
    case 'check':
      console.log(check(+num));
      break;
    case 'toggle':
      toggle(+num);
      break;
    case 'all':
      all();
      break;
    case 'empty':
      empty();
      break;
  }
}
