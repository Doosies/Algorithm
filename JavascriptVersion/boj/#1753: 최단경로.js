class minheap {
  #arr = [];
  #parent = idx => Math.floor((idx - 1) / 2);
  #left = idx => idx * 2 + 1;
  #right = idx => idx * 2 + 2;
  #last = () => this.#arr.length - 1;
  #swap = (a, b) => ([this.#arr[a], this.#arr[b]] = [this.#arr[b], this.#arr[a]]);
  isEmpty = () => this.#arr.length === 0;
  push(data) {
    this.#arr.push(data);
    let now = 0;
    while (now > 0 && this.#arr[now][1] < this.#arr[parent][1]) {
      const parent = this.#parent(now);
      this.#swap(now, parent);
      now = parent;
    }
  }
  pop() {
    this.#swap(0, this.#last());
    const result = this.#arr.pop();
    let [now, left, right] = [0, 1, 2];
    while (left <= this.#last()) {
      let change = left;
      if (right <= this.#last() && this.#arr[right][1] < this.#arr[left][1]) {
        change = right;
      }
      if (this.#arr[change][1] < this.#arr[now][1]) {
        this.#swap(change, now);
        now = change;
        left = this.#left(now);
        right = this.#right(now);
      } else break;
    }
    return result;
  }
}
//prettier-ignore
const stdin = (process.platform === 'linux'? require('fs').readFileSync(0, 'utf-8'): `
4 1 
1
4 2 3
`).trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [V, E] = input();
const start = +input();
const G = Array.from({ length: V + 1 }, () => new Map());
const dist = Array.from({ length: V + 1 }, () => Infinity);
const h = new minheap();

for (let i = 0; i < E; i++) {
  const [from, to, w] = input();
  G[from].set(to, Math.min(w, G[from].get(to) || Infinity));
}

dist[start] = 0;
h.push([start, 0]);

while (!h.isEmpty()) {
  const [now, d] = h.pop();
  if (dist[now] < d) continue;
  for (let [next, w] of G[now]) {
    if (dist[next] > d + w) {
      dist[next] = d + w;
      h.push([next, d + w]);
    }
  }
}

console.log(
  dist
    .slice(1)
    .map(v => (v === Infinity ? 'INF' : v))
    .join('\n')
    .trim(),
);
