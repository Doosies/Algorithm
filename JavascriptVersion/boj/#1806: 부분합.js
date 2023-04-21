//prettier-ignore
const stdin = (process.platform === 'linux'? require('fs').readFileSync(0, 'utf-8'): `
10 15
5 1 3 5 10 7 4 9 2 8
`).trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, S] = input();
const arr = input();

let len = Infinity;
let sum = 0;
let r = 0;

for (let l = 0; l < N; l++) {
  while (r < N && sum < S) sum += arr[r++];
  if (sum >= S) len = len > r - l ? r - l : len;
  sum -= arr[l];
}

console.log(len === Infinity ? 0 : len);
