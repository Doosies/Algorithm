// // // // // // // // // // // // // // // // // // // // // // // // // // // dfs 접근
// function solution(alp, cop, problems) {
//   const solvedProblems = new Set();
//   let maxAlp = Math.max(...problems.map(e => e[0]));
//   let maxCop = Math.max(...problems.map(e => e[1]));
//   let result = Infinity;

//   const dfs = (nowAlp, nowCop, time, solved) => {
//     if (maxAlp <= nowAlp && maxCop <= nowCop) {
//       result = Math.min(result, time);
//       return;
//     }
//     problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost], i) => {
//       // 문제를 풀기위한 알고력 코딩력이 충분하다면 해당 문제를 풀음
//       if (alp_req <= nowAlp && cop_req <= nowCop) {
//         solvedProblems.add(i);
//         dfs(nowAlp + alp_rwd, nowCop + cop_rwd, time + cost, solved + 1);
//       } else if (nowAlp < alp_req) {
//         // 부족하다면 alp 혹은 cop를 증가함
//         dfs(nowAlp + 1, nowCop, time + 1, solved);
//       } else if (nowCop < cop_req) {
//         dfs(nowAlp, nowCop + 1, time + 1, solved);
//       }
//     });
//   };
//   dfs(alp, cop, 0, 0);
//   return result;
//   // console.log(result);
//   // var answer = 0;
//   // return answer;
// }

// // // // // // // // // // // // // // // // // // // // // // // // // // // bfs 접근 + 최소힙
class MinHeap {
  #heap = [];
  #lastIdx = -1;

  constructor(arr = []) {
    this.#heap = arr;
    this.#lastIdx = arr.length - 1;
  }

  push(element) {
    this.#heap.push(element);
    this.#heapifyUp(++this.#lastIdx);
  }

  pop() {
    const lastIdx = this.#lastIdx--;
    if (lastIdx > -1) {
      [this.#heap[0], this.#heap[lastIdx]] = [this.#heap[lastIdx], this.#heap[0]];

      const poped = this.#heap.pop();
      this.#heapifyDown(0);

      return poped;
    }
  }

  isEmpty = () => (this.#heap.length > 0 ? false : true);
  length = () => this.#lastIdx + 1;

  #parent = idx => Math.floor((idx - 1) / 2);
  #left = idx => idx * 2 + 1;
  #right = idx => idx * 2 + 2;

  #heapifyUp = nowIdx => {
    let parentIdx = this.#parent(nowIdx);

    while (parentIdx > -1 && this.#heap[nowIdx][2] < this.#heap[parentIdx][2]) {
      [this.#heap[nowIdx], this.#heap[parentIdx]] = [this.#heap[parentIdx], this.#heap[nowIdx]];
      nowIdx = parentIdx;
      parentIdx = this.#parent(nowIdx);
    }
  };

  #heapifyDown = nowIdx => {
    let left = this.#left(nowIdx);
    let right = this.#right(nowIdx);
    let swapIdx = left;

    if (left > this.#lastIdx) return;

    if (right < this.#lastIdx && this.#heap[left][2] > this.#heap[right][2]) {
      swapIdx = right;
    }

    if (this.#heap[nowIdx][2] > this.#heap[swapIdx][2]) {
      [this.#heap[nowIdx], this.#heap[swapIdx]] = [this.#heap[swapIdx], this.#heap[nowIdx]];
    }
    this.#heapifyDown(swapIdx);
  };
}

function solution(alp, cop, problems) {
  let maxAlp = Math.max(...problems.map(e => e[0]), alp);
  let maxCop = Math.max(...problems.map(e => e[1]), cop);

  const visited = Array.from({ length: maxAlp + 1 }, () => Array.from({ length: maxCop + 1 }, () => false));
  const heapq = new MinHeap();

  alp = Math.min(maxAlp, alp);
  cop = Math.min(maxCop, cop);

  problems.push([0, 0, 0, 1, 1]);
  problems.push([0, 0, 1, 0, 1]);

  heapq.push([alp, cop, 0]);

  while (!heapq.isEmpty()) {
    let [nowAlp, nowCop, time] = heapq.pop();
    // console.log(time, nowAlp, nowCop);

    if (nowAlp > maxAlp) nowAlp = maxAlp;
    if (nowCop > maxCop) nowCop = maxCop;

    if (visited[nowAlp][nowCop]) continue;
    visited[nowAlp][nowCop] = true;

    if (nowAlp >= maxAlp && nowCop >= maxCop) {
      return time;
    }

    for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
      if (nowAlp >= alp_req && nowCop >= cop_req) {
        heapq.push([nowAlp + alp_rwd, nowCop + cop_rwd, time + cost]);
      }
    }
  }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // dp 접근
// function solution(alp, cop, problems) {
//   let maxAlp = alp;
//   let maxCop = cop;
//   for (let i = 0; i < problems.length; i++) {
//     maxAlp = Math.max(maxAlp, problems[i][0]);
//     maxCop = Math.max(maxCop, problems[i][1]);
//   }

//   // problems.push([0, 0, 1, 0, 1]);
//   // problems.push([0, 0, 0, 1, 1]);

//   const dp = Array.from(Array(maxAlp + 1), () => Array(maxCop + 1).fill(Infinity));
//   dp[alp][cop] = 0;

//   for (let i = alp; i <= maxAlp; i++) {
//     for (let j = cop; j <= maxCop; j++) {
//       if (i + 1 < maxAlp) {
//         if (dp[i + 1][j] > dp[i][j] + 1) dp[i + 1][j] = dp[i][j] + 1;
//         else dp[i + 1][j] = dp[i + 1][j];
//       }
//       if (j + 1 < maxCop) {
//         if (dp[i][j + 1] > dp[i][j] + 1) dp[i][j + 1] = dp[i][j] + 1;
//         else dp[i][j + 1] = dp[i][j + 1];
//       }
//       for (let [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
//         if (i >= alp_req && j >= cop_req) {
//           const nextAlp = i + alp_rwd > maxAlp ? maxAlp : i + alp_rwd;
//           const nextCop = j + cop_rwd > maxCop ? maxCop : j + cop_rwd;

//           dp[nextAlp][nextCop] = Math.min(dp[nextAlp][nextCop], dp[i][j] + cost);
//         }
//       }
//     }
//   }
//   return dp[maxAlp][maxCop];
// }

console.log(
  solution(10, 10, [
    [10, 15, 2, 1, 2],
    [20, 20, 3, 3, 4],
  ]),
);
console.log(
  solution(0, 0, [
    [0, 0, 2, 1, 2],
    [4, 5, 3, 1, 2],
    [4, 11, 4, 0, 2],
    [10, 4, 0, 4, 2],
  ]),
);

// problems[0] - 필요 알고력
// problems[1] - 필요 코딩력
// problems[2] - 풀이시 증가 알고력
// problems[3] - 풀이시 증가 코딩력
// problems[4] - 푸는데 드는 시간
// alp_req, cop_req, alp_rwd, cop_rwd, cost

// dfs로 문제 풀수 있는지 확인하고 푼 문제가 problems길이와 같다면 return
