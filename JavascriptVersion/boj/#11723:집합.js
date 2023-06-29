// 문제링크: https://www.acmicpc.net/problem/11723
// 시작날짜: 2023.06.29
// 시작시간: 14:13
// 종료시간: 14:52
// 소요시간: 00:39

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
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
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ');})();

const M = +input();
let set = 0;
let result = '';

const shift = cnt => 1 << (cnt - 1);

const func = {
  add: cnt => (set = set | shift(cnt)),
  remove: cnt => (set = set ^ shift(cnt)),
  check: cnt => (set & shift(cnt)) > 0,
  toggle: cnt => (set = set ^ shift(cnt)),
  all: () => (set = 1048575),
  empty: () => (set = 0),
};

for (let i = 0; i < M; i++) {
  const [cmd, num] = input();
  const checkNum = func[cmd](+num);
  if (cmd === 'check') result += `${+checkNum}\n`;
}

console.log(result);
