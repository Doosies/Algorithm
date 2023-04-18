class MinHeap {
  #arr = [];
  push(data) {
    this.#arr.push(data);
    let now = this.#last();

    while (now > 0) {
      const parent = this.#parent(now);
      if (this.#arr[now][1] < this.#arr[parent][1]) {
        this.#swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    this.#swap(0, this.#last());
    const result = this.#arr.pop();

    let now = 0;
    let left = 1;
    let right = 2;

    while (left <= this.#last()) {
      let next = left;
      if (right <= this.#last() && this.#arr[left][1] > this.#arr[right][1]) {
        next = right;
      }

      if (this.#arr[now][1] > this.#arr[next][1]) {
        this.#swap(now, next);
        now = next;
        left = this.#left(now);
        right = this.#right(now);
      } else {
        break;
      }
    }

    return result;
  }
  #parent = idx => Math.floor((idx - 1) / 2);
  #left = idx => idx * 2 + 1;
  #right = idx => idx * 2 + 2;
  #last = () => this.#arr.length - 1;
  isEmpty = () => this.#arr.length === 0;
  #swap = (a, b) => ([this.#arr[a], this.#arr[b]] = [this.#arr[b], this.#arr[a]]);
}

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5
    `
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const N = +input(); //노드
const M = +input(); //간선
const G = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => Infinity));

const h = new MinHeap();
const dist = Array.from({ length: N + 1 }, () => Infinity);

for (let i = 0; i < M; i++) {
  const [from, to, v] = input();
  G[from][to] = Math.min(G[from][to], v);
}

const [S, E] = input();
dist[S] = 0;
h.push([S, 0]);

while (!h.isEmpty()) {
  const [now, v] = h.pop();

  if (dist[now] < v) {
    continue;
  }

  for (let next = 1; next <= N; next++) {
    if (G[now][next] === Infinity) continue;
    if (dist[next] > G[now][next] + v) {
      dist[next] = G[now][next] + v;
      h.push([next, G[now][next] + v]);
    }
  }
}

console.log(dist[E]);
