class Deque {
  #front = 0;
  #back = 1;
  #deque = {};
  length = 0;

  pushFront(data) {
    this.#deque[this.#front--] = data;
    this.length++;
  }
  pushBack(data) {
    this.#deque[this.#back++] = data;
    this.length++;
  }
  popFront() {
    this.length -= this.length > 0 ? 1 : 0;
    if (this.#front === this.#back) {
      this.#front = 0;
      this.#back = 1;
      return [];
    }

    const idx = ++this.#front;
    const data = this.#deque[idx];

    delete this.#deque[idx];
    return data;
  }
  popBack() {
    this.length -= this.length > 0 ? 1 : 0;
    if (this.#front === this.#back) {
      this.#front = 0;
      this.#back = 1;
      return [];
    }

    const idx = --this.#back;
    const data = this.#deque[idx];

    delete this.#deque[idx];
    return data;
  }
}

const fs = require('fs');
const stdin = (process.platform === 'linux' ? fs.readFileSync(0, 'utf-8') : `50 2000`).trim().split('\n');
const [N, K] = stdin[0].split(' ').map(Number);
const visit = Array(200001).fill(false);
const queue = new Deque();
queue.pushFront([N, 0]);
visit[N] = 0;

while (queue.length > 0) {
  const [now, time] = queue.popFront();

  if (now === K) {
    console.log(time);
    return;
  }

  if (now * 2 <= 200001 && !visit[now * 2]) {
    queue.pushFront([now * 2, time]);
    visit[now * 2] = true;
  }
  if (now - 1 >= 0 && !visit[now - 1]) {
    queue.pushBack([now - 1, time + 1]);
    visit[now - 1] = true;
  }
  if (now + 1 <= 200001 && !visit[now + 1]) {
    queue.pushBack([now + 1, time + 1]);
    visit[now + 1] = true;
  }
}
