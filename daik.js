const searchMinNode = (visited, dist) => {
  let min = Infinity;
  let minIdx = 1;

  for (let i = 0; i < dist.length; i++) {
    if (!visited[i] && dist[i] < min) {
      min = dist[i];
      minIdx = i;
    }
  }
};

function solution(N, road, K) {
  const G = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => Infinity)
  );

  const visited = Array(N + 1).fill(false);
  const dist = visited.map((_, i) => G[1][i]);

  road.forEach((r) => {
    G[r[0]][r[1]] = Math.min(r[2], G[r[0]][r[1]]);
    G[r[1]][r[0]] = Math.min(r[2], G[r[1]][r[0]]);
  });

  visited[1] = true;
  dist[1] = 0;

  // dist 갯수만큼 돌음
  for (let i = 0; i < dist.length; i++) {
    const nowIdx = searchMinNode(visited, dist);
    visited[nowIdx] = true;
    // dist에서 가장 작은 노드 찾아서 갱신해줌
    for (let j = 0; j < dist.length; j++) {
      // 방문한적 있으면 넘김
      if (visited[j]) continue;
      if (dist[j] > dist[nowIdx] + G[nowIdx][j]) {
        dist[j] = dist[nowIdx] + G[nowIdx][j];
      }
    }
  }

  // console.log(dist);
  return dist.filter((d) => d <= K).length;
}

const n = 6;
const road = [
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 2],
  [3, 4, 3],
  [3, 5, 2],
  [3, 5, 3],
  [5, 6, 1],
];
const k = 4;

const result = solution(n, road, k);
console.log(result);
