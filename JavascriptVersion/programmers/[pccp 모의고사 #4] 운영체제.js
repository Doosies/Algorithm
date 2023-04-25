class q {
  // 0 score, 1 startT, 2 runT, 3 입력된 순서
  #arr = [];
  #p = idx => Math.floor((idx - 1) / 2);
  #l = idx => idx * 2 + 1;
  #r = idx => idx * 2 + 2;
  #last = () => this.#arr.length - 1;
  #swap = (a, b) => ([this.#arr[a], this.#arr[b]] = [this.#arr[b], this.#arr[a]]);
  #comp = (a, b) => {
    if (this.#arr[a][0] < this.#arr[b][0]) return true;
    if (this.#arr[a][0] === this.#arr[b][0] && this.#arr[a][1] < this.#arr[b][1]) return true;
    return false;
  };
  isEmpty = () => this.#arr.length === 0;
  push(data) {
    this.#arr.push(data);
    let now = this.#last();
    while (now > 0) {
      const p = this.#p(now);
      if (this.#comp(now, p)) {
        this.#swap(now, p);
        now = p;
      } else break;
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
      if (right <= this.#last() && this.#comp(right, left)) {
        next = right;
      }
      if (this.#comp(next, now)) {
        this.#swap(now, next);
        now = next;
        left = this.#l(now);
        right = this.#r(now);
      } else break;
    }
    return result;
  }
}

const solution = program => {
  const result = Array(11).fill(0);
  const pq = new q();
  let nowT = 0;

  program.sort((a, b) => b[1] - a[1]);

  const pushQueue = () => {
    while (program.length && program.at(-1)[1] <= nowT) {
      pq.push(program.pop());
    }
  };

  while (program.length || !pq.isEmpty()) {
    if (pq.isEmpty()) {
      nowT = program.at(-1)[1];
      pushQueue();
    }

    const [a, b, c] = pq.pop();
    result[a] += nowT - b;
    nowT += c;

    pushQueue();
  }
  result[0] = nowT;

  return result;
};
// 100 101
console.log(
  solution([
    [2, 0, 10],
    [1, 5, 5],
    [3, 5, 3],
    [3, 12, 2],
  ]),
);
