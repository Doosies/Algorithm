function solution(n, paths, gates, summits) {
  const G = Array.from({ length: n + 1 }, () => []);
  const cost = Array(n + 1).fill(Infinity);
  const q = gates;

  paths.forEach(([from, to, cost]) => {
    G[from].push([to, cost]);
    G[to].push([from, cost]);
  });
  summits.forEach(summit => {
    G[summit] = [];
  });
  gates.forEach(gate => {
    cost[gate] = -1;
  });

  while (q.length) {
    const now = q.shift();

    G[now].forEach(([next, weight]) => {
      const nowCost = Math.max(cost[now], weight);
      if (cost[next] > nowCost) {
        cost[next] = nowCost;
        q.push(next);
      }
    });
  }
  return summits
    .map(summit => [summit, cost[summit]])
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      else return a[1] - b[1];
    })[0];
}

const a = solution(
  6,
  [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
  ],
  [1, 3],
  [5],
); //	[5, 3]
const b = solution(
  7,
  [
    [1, 4, 4],
    [1, 6, 1],
    [1, 7, 3],
    [2, 5, 2],
    [3, 7, 4],
    [5, 6, 6],
  ],
  [1],
  [2, 3, 4],
); //	[3, 4]
const c = solution(
  7,
  [
    [1, 2, 5],
    [1, 4, 1],
    [2, 3, 1],
    [2, 6, 7],
    [4, 5, 1],
    [5, 6, 1],
    [6, 7, 1],
  ],
  [3, 7],
  [1, 5],
); //	[5, 1]
const d = solution(
  5,
  [
    [1, 3, 10],
    [1, 4, 20],
    [2, 3, 4],
    [2, 4, 6],
    [3, 5, 20],
    [4, 5, 6],
  ],
  [1, 2],
  [5],
); //	[5, 6]

console.log(a);
console.log(b);
console.log(c);
console.log(d);
