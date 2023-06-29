class Heap {
  stor = [];
  push(data) {
    this.stor.push(data);
    let now = this.stor.length - 1;

    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);

      if (this.stor[now][1] < this.stor[parent][1]) {
        this.swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    let lastIdx = this.stor.length - 1;
    this.swap(0, lastIdx);

    const data = this.stor.pop();
    lastIdx -= 1;

    let now = 0;
    let left = 1;
    let right = 2;

    // 현재노드 왼쪽이 존재한다면 while실행
    while (left <= lastIdx) {
      let changeIdx = left;

      if (right <= lastIdx && this.stor[left][1] > this.stor[right][1]) {
        changeIdx = right;
      }

      if (this.stor[now][1] > this.stor[changeIdx][1]) {
        this.swap(now, changeIdx);
        now = changeIdx;
        left = now * 2 + 1;
        right = now * 2 + 2;
      } else {
        break;
      }
    }

    return data;
  }
  swap(a, b) {
    [this.stor[a], this.stor[b]] = [this.stor[b], this.stor[a]];
  }
  isEmpty() {
    this.stor.length === 0;
  }
}
// start = 1, end = 5
function solution(n, route) {
  const graph = {};
  route.forEach(([to, from, cost]) => {
    if (graph[to]) graph[to].push([from, cost]);
    else graph[to] = [[from, cost]];

    if (graph[from]) graph[from].push([to, cost]);
    else graph[from] = [[to, cost]];
  });

  const heap = new Heap();
  const dists = Array(n + 1).fill(Infinity);
  dists[1] = 0;

  heap.push([1, 0]);

  while (!heap.isEmpty()) {
    const [now, nowDist] = heap.pop();

    if (now === n) {
      break;
    }

    for (const [next, nextCost] of graph[now]) {
      const max = Math.max(nextCost, nowDist);
      if (dists[next] > max) {
        dists[next] = max;
        heap.push([next, max]);
      }
    }
  }

  return dists[n];
}

console.log(
  solution(3, [
    [1, 2, 1],
    [1, 3, 4],
    [2, 3, 2],
  ]),
);
// m;
console.log(
  solution(5, [
    [5, 1, 15],
    [4, 2, 6],
    [1, 4, 8],
    [3, 2, 10],
    [1, 2, 7],
    [5, 4, 6],
    [2, 5, 11],
  ]),
);
