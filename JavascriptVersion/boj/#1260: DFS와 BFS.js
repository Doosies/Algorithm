const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
4 5 1
1 2
1 3
1 4
2 4
3 4
`
)
  .trim()
  .split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const [N, M, V] = input();
const graph = Array.from({ length: N + 1 }, () => []);

// 양방향 입력
for (let i = 0; i < M; i++) {
  const [from, to] = input();
  graph[from].push(to);
  graph[to].push(from);
}
// 정점 정렬
for (let i = 1; i < N + 1; i++) {
  graph[i].sort((a, b) => a - b);
}

const ansDfs = []; // dfs 정답배열
const ansBfs = []; // bfs 정답 배열

const dfs = () => {
  const visited = Array(N + 1).fill(false);

  const dfsfunc = now => {
    if (visited[now]) return;
    visited[now] = true;

    ansDfs.push(now);

    // 다음 정점 방문
    for (let next of graph[now]) {
      // 방문한적 없다면
      if (!visited[next]) {
        dfsfunc(next);
      }
    }
  };

  dfsfunc(V);
};

const bfs = () => {
  const queue = [V];
  const visited = Array(N + 1).fill(false);

  // 큐가 빌때까지 반복
  while (queue.length !== 0) {
    const now = queue.shift();
    if (visited[now]) continue;
    visited[now] = true;

    ansBfs.push(now);

    // 다음정점 방문
    for (let next of graph[now]) {
      // 방문한적 없다면
      if (!visited[next]) {
        queue.push(next);
      }
    }
  }
};

dfs();
bfs();

console.log(ansDfs.join(' '));
console.log(ansBfs.join(' '));
