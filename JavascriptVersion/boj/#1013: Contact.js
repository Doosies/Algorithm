const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
console.log(
  Array.from({ length: +stdin[0] }, (_, i) => /^(100+1+|01)+$/.test(stdin[i + 1]))
    .map(v => (v ? 'YES' : 'NO'))
    .join(' \n'),
);
