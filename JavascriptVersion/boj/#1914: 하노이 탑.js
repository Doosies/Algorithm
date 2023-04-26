const stdin = (process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8') : `3`).trim().split('\n');
const N = +stdin[0];
let result = '';

const hanoi = (now, start, mid, to) => {
  if (now === 0) return;

  hanoi(now - 1, start, to, mid);
  result += `${start} ${to} ${now}\n`;
  hanoi(now - 1, mid, start, to);
};

console.log(2 ** N - 1);
if (N <= 20) {
  hanoi(+stdin[0], 1, 2, 3);
  console.log(result.trim());
}
