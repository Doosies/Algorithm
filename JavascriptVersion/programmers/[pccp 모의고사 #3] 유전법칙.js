const getGene = (n, p) => {
  const stack = [];

  for (let i = n; i > 1; i--) {
    stack.push(p % 4);
    p = parseInt(p / 4);
  }

  while (stack.length) {
    const num = stack.pop();
    if (num == 0) return 'RR';
    if (num == 3) return 'rr';
  }
  return 'Rr';
};

const solution = queries => queries.map(([n, p]) => getGene(n, p - 1));

console.log(solution([[3, 5]]));
console.log(
  solution([
    [3, 8],
    [2, 2],
  ]),
);
console.log(
  solution([
    [3, 1],
    [2, 3],
    [3, 9],
  ]),
);
console.log(solution([[4, 26]]));
