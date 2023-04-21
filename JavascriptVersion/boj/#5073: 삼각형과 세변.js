//prettier-ignore
const stdin = (process.platform === 'linux'? require('fs').readFileSync(0, 'utf-8'): `
7 7 7
6 5 4
3 2 5
6 2 6
0 0 0
`).trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const result = [];

while (true) {
  const [a, b, c] = input();
  const max = Math.max(a, b, c);
  const min = Math.min(a, b, c);
  const mid = a + b + c - max - min;

  if (a === 0 && b === 0 && c === 0) break;

  if (min + mid <= max) result.push('Invalid');
  else if (a === b && b === c) result.push('Equilateral');
  else if (a === b || a === c || b === c) result.push('Isosceles');
  else if (a !== b && a !== c && b !== c) result.push('Scalene');
}

console.log(result.join('\n'));
