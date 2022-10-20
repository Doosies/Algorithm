const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `7 392`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

function solution(s, t) {
  if (s === t) return 0;
  if (t === 0) return '-';

  const memo = new Set();
  const queue = [
    { now: s * s, str: '*' },
    { now: s + s, str: '+' },
    { now: 1, str: '/' },
  ];

  while (queue.length > 0) {
    const { now, str } = queue.shift();
    if (now === t) {
      return str;
    }
    if (memo.has(now)) {
      continue;
    }
    memo.add(now);

    if (now * now <= t) queue.push({ now: now * now, str: `${str}*` });
    if (now + now <= t) queue.push({ now: now + now, str: `${str}+` });
  }
  return -1;
}

const [s, t] = input();
console.log(solution(s, t));
