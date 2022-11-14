const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3
5
5 4 3 2 1
2
2 4
3 4
3
2 3 1
0
4
1 2 3 4
3
1 2
3 4
2 3
    `
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const T = +input();
const solution = () => {
  const teamCnt = +input();
  const rank = input();
  const changedPairCnt = +input();

  const changedPairs = Array.from({ length: changedPairCnt }, () => input());
  const graph = Array.from({ length: teamCnt + 1 }, () => new Set());

  // graph의 인접리스트에 추가해줌
  for (let i = 0; i <= teamCnt; i++) {
    for (let j = i + 1; j < teamCnt; j++) {
      graph[rank[i]].add(rank[j]);
    }
  }

  changedPairs.forEach(([l, r]) => {
    if (graph[l].has(r)) {
      graph[l].delete(r);
      graph[r].add(l);
    } else if (graph[r].has(l)) {
      graph[r].delete(l);
      graph[l].add(r);
    }
  });

  const visited = Array.from({ length: teamCnt + 1 }, () => false);
  const finished = Array.from({ length: teamCnt + 1 }, () => false);
  let result = [];
  let cycle = false;

  const dfs = now => {
    visited[now] = true;

    for (next of graph[now]) {
      if (!visited[next]) {
        dfs(next);
      }
      if (!finished[next]) {
        cycle = true;
      }
    }

    // 순환 체크용
    finished[now] = true;
    result.push(now);
  };

  for (let i = 1; i < teamCnt + 1; i++) {
    !visited[i] && dfs(i);
  }

  return cycle ? 'IMPOSSIBLE' : result.reverse().join(' ');
};
for (let l = 0; l < T; l++) {
  console.log(solution());
}
