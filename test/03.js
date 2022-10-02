// class MinHeap {
//   #heap = [];
//   #lastIdx = -1;

//   push(element) {
//     this.#heap.push(element);
//     this.#heapifyUp(++this.#lastIdx);
//   }

//   pop() {
//     const lastIdx = this.#lastIdx--;
//     if (lastIdx > -1) {
//       [this.#heap[0], this.#heap[lastIdx]] = [
//         this.#heap[lastIdx],
//         this.#heap[0],
//       ];

//       const poped = this.#heap.pop();
//       this.#heapifyDown(0);

//       return poped;
//     }
//   }

//   isEmpty = () => (this.#heap.length > 0 ? false : true);
//   getArray = () => this.#heap;

//   #parent = (idx) => Math.floor((idx - 1) / 2);
//   #left = (idx) => idx * 2 + 1;
//   #right = (idx) => idx * 2 + 2;

//   #heapifyUp = (nowIdx) => {
//     let parentIdx = this.#parent(nowIdx);
//     while (
//       parentIdx > -1 &&
//       this.#heap[nowIdx].dist < this.#heap[parentIdx].dist
//     ) {
//       [this.#heap[nowIdx], this.#heap[parentIdx]] = [
//         this.#heap[parentIdx],
//         this.#heap[nowIdx],
//       ];
//       nowIdx = parentIdx;
//       parentIdx = this.#parent(nowIdx);
//     }
//   };

//   #heapifyDown = (nowIdx) => {
//     let left = this.#left(nowIdx);
//     let right = this.#right(nowIdx);
//     let swapIdx = left;

//     if (left > this.#lastIdx) return;

//     if (
//       right < this.#lastIdx &&
//       this.#heap[left].dist > this.#heap[right].dist
//     ) {
//       swapIdx = right;
//     }

//     if (this.#heap[nowIdx].dist > this.#heap[swapIdx].dist) {
//       [this.#heap[nowIdx], this.#heap[swapIdx]] = [
//         this.#heap[swapIdx],
//         this.#heap[nowIdx],
//       ];
//     }
//     this.#heapifyDown(swapIdx);
//   };
// }

// const getPathsWhereStartGate = (graph, n, gates) => {
//   const dists = Array(n + 1).fill(Infinity);
//   const queue = []; // new MinHeap();

//   gates.forEach((gate) => {
//     queue.push({ to: gate, dist: 0 });
//     dists[gate] = 0;
//   });

//   while (queue.length > 0) {
//     // 힙에 들어있는건 to까지 가는데 dist의 비용이 든다는 뜻
//     const { to: from, dist: fromDist } = queue.shift();

//     // 현재 기록된 비용보다 큐에서 꺼낸 비용이 더 크다면 볼필요 없음
//     if (dists[from] > fromDist) continue;

//     graph[from].forEach(({ to, dist }) => {
//       const max = Math.max(dists[from], dist);
//       if (dists[to] > max) {
//         dists[to] = max;
//         queue.push({ to, dist: dists[to] });
//       }
//     });
//   }
//   return dists;
// };

function solution(n, paths, gates, summits) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const dists = Array(n + 1).fill(Infinity);
  const queue = gates;
  let min = [];

  paths.forEach(([from, to, dist]) => {
    graph[from].push([to, dist]);
    graph[to].push([from, dist]);
  });
  summits.forEach((summit) => {
    graph[summit] = [];
  });
  gates.forEach((gate) => {
    dists[gate] = 0;
  });

  while (queue.length > 0) {
    const from = queue.shift();

    graph[from].forEach(([to, dist]) => {
      const max = Math.max(dists[from], dist);
      if (dists[to] > max) {
        dists[to] = max;
        queue.push(to);
      }
    });
  }

  return summits
    .map((summit) => [summit, dists[summit]])
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      else return a[1] - b[1];
    })[0];
}

const a = [
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
];
const b = [
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
];
const c = [
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
];
const d = [
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
];

console.log(solution(...a));
console.log(solution(...b));
console.log(solution(...c));
console.log(solution(...d));
