// ////////////////////////////////////////////////////////while문
// // 한개랑만 연결된거
// const findNodeNumber = graph => {
//   const keys = Object.keys(graph);
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     if (graph[key].length === 1) {
//       return [key, graph[key][0]];
//     }
//   }
//   return -1;
// };
// // 노드 두개중 다른곳과 연결된거
// const connectAnotherNode = (a, b, graph) => {
//   if (graph[a].length > 1) return [b, a];
//   if (graph[b].length > 1) return [a, b];
//   return -1;
// };
// const calculate = (end, middle) => {
//   let cnt = 0;
//   while (end !== 0) {
//     if (end > 0) {
//       end--;
//       middle++;
//       cnt++;
//     } else {
//       end++;
//       middle--;
//       cnt++;
//     }
//   }
//   return [end, middle, cnt];
// };
// function solution(a, edges) {
//   const graph = {};
//   let graphT = Array.from({ length: a.length }, () => new Set());
//   let result = 0;

//   // set으로 입력(중복 제거)
//   for (let i = 0; i < edges.length; i++) {
//     const [a, b] = edges[i];
//     graphT[a].add(b);
//     graphT[b].add(a);
//   }
//   // set -> dictionary로 옮김
//   for (let i = 0; i < graphT.length; i++) {
//     graph[i] = [...graphT[i]];
//   }

//   while (true) {
//     // 1. 한개만 있는걸 찾음
//     const [node1, node2] = findNodeNumber(graph);
//     // 2. 해당 노드 두개중 다른곳과 연결된곳을 찾음
//     const [endNode, middleNode] = connectAnotherNode(node1, node2, graph);
//     // 3. 다른곳과 연결되지 않은 부분을 0으로 만드는 연산을 실행
//     const [endA, middleA, count] = calculate(a[endNode], a[middleNode]);
//     [a[endNode], a[middleNode]] = [endA, middleA];
//     result += count;
//     // 4. 다른곳과 연결된 부분에서 끝부분을 제거함(endNode)
//     //    끝부분 노드 자체도 제거함
//     const endIdx = graph[middleNode].indexOf(+endNode);
//     graph[middleNode].splice(endIdx, 1);
//     delete graph[endNode];

//     // 5. 두개만 남으면 서로 연결돼있음
//     // 이떄 두개를 더해서 0이면 result에 절대값을 더함
//     if (Object.keys(graph).length === 2) {
//       const [endNode, middleNode] = Object.keys(graph);
//       if (a[endNode] + a[middleNode] === 0) {
//         result += Math.abs(a[endNode]);
//       } else {
//         result = -1;
//       }
//       break;
//     }
//   }
//   return result;
// }
////////////////////////////////////////////////////////////dfs->재귀
// const solution = (a, edges) => {
//   let graph = Array.from({ length: a.length }, () => []);
//   let result = 0;

//   // 그래프 입력
//   for (let i = 0; i < edges.length; i++) {
//     const [a, b] = edges[i];
//     graph[a].push(b);
//     graph[b].push(a);
//   }

//   const dfs = (beforeNode, nowNode) => {
//     // 현재
//     for (let i = 0; i < graph[nowNode].length; i++) {
//       const nextNode = graph[nowNode][i];
//       if (nextNode === beforeNode) continue;
//       dfs(nowNode, nextNode);
//     }

//     // 바닥에 도착하면
//     // 상위 노드에 현재노드를 더해줌
//     a[beforeNode] += a[nowNode];
//     // 결과에 현재노드의 가중치를 더해줌
//     result += Math.abs(a[nowNode]);
//   };
//   dfs(-1, 0);

//   return a[0] === 0 ? result : -1;
// };

const solution = (a, edges) => {
  // 이전, 현재
  const stack = [[-1, 0]];
  const visited = Array.from({ length: a.length }, () => false);
  let graph = Array.from({ length: a.length }, () => []);
  let result = 0n;

  // 그래프 입력
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    graph[a].push(b);
    graph[b].push(a);
  }

  while (stack.length) {
    const [before, now] = stack.pop();

    // 마지막 아래쪽 노드에 도촉한 경우
    if (visited[now]) {
      a[before] += a[now];
      result += BigInt(Math.abs(a[now]));
      continue;
    }
    // 재귀함수처럼 한번더 부모노드에 들리기위해 넣어둠
    visited[now] = true;
    stack.push([before, now]);

    for (next of graph[now]) {
      if (visited[next]) continue;
      stack.push([now, next]);
    }
  }

  return a[0] === 0 ? result : -1;
};

console.log(
  solution(
    [-5, 0, 2, 1, 2],
    [
      [0, 1],
      [3, 4],
      [2, 3],
      [0, 3],
    ],
  ),
);

console.log(
  solution(
    [0, 1, 0],
    [
      [0, 1],
      [1, 2],
    ],
  ),
);
console.log(
  solution(
    [-2, 8, -5, -5, -3, 0, 5, 2],
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 6],
      [2, 7],
    ],
  ),
);
// 정규식 생성. a만 포함
