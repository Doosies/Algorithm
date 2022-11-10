const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3 2
1 3
2 3
4 2
4 2
3 1
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const solution = () => {
  // N = 노드 개수, 1 ~ 32,000
  // M = 간선 개수, 1 ~ 100,000
  const [N, M] = input();
  const graph = Array.from({ length: N + 1 }, () => []);
  const visited = Array.from({ length: N + 1 }, () => false);
  // const inDegree = Array.from({ length: N + 1 }, (_, i) => (i === 0 ? -1 : 0));
  // const queue = [];
  const result = [];

  const bfs = () => {
    // 노드 개수만큼 for문을 돌음.
    for (let i = 1; i < N + 1; i++) {
      // 모든 노드를 방문하기 전 큐가 비면 순환이 발생

      const nowNode = queue.pop();
      result.push(nowNode);

      for (nextNode of graph[nowNode]) {
        inDegree[nextNode]--;
        if (inDegree[nextNode] === 0) queue.push(nextNode);
      }
    }
    // 진입차수 초기화
    for (now of graph) {
      for (next of now) {
        inDegree[next]++;
      }
    }
    inDegree.forEach((degree, idx) => degree === 0 && queue.push(idx));
  };
  const dfs = now => {
    if (visited[now]) return;
    visited[now] = true;

    for (next of graph[now]) {
      if (visited[next]) continue;
      dfs(next);
    }

    // 리프노드에 도달하면 현재 자기노드 반환
    result.push(now);
  };

  // 입력
  for (let i = 0; i < M; i++) {
    const [from, to] = input();
    graph[from].push(to);
  }
  // bfs();
  for (let i = 1; i < N + 1; i++) {
    dfs(i);
  }

  return result.reverse().join(' ');
};

console.log(solution());

// for (let i = 0; i < 2; i++) {
//   console.log(solution());
// }

// 1. 진입차수가 0인 노드를 큐에 넣음
// 2. 큐에서 노드를 빼서 연결된 노드의 진입차수를 1 빼줌
// 3. 진입차수가 0이 된다면 그 노드를 큐에 넣음.
