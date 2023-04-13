class Node {
  before = null;
  data = null;
  constructor(data) {
    this.data = data;
  }
}
class Queue {
  // 나가는 부분이 헤드
  #head = null;
  // 들어오는 부분이 테일
  #tail = null;
  length = 0;

  push(data) {
    const node = new Node(data);

    if (!this.#head) {
      this.#head = node;
    } else {
      this.#tail.before = node;
    }
    this.#tail = node;
    this.length++;
  }

  pop() {
    if (this.#head) {
      const data = this.#head.data;
      this.#head = this.#head.before;
      this.length--;
      return data;
    }
  }
}

class Queue2 {
  #head = 0;
  #tail = 0;
  #queue = {};

  push(data) {
    this.#queue[this.#head++] = data;
  }
  pop() {
    const idx = this.#tail++;
    const data = this.#queue[idx];
    delete this.#queue[idx];
    return data;
  }
}
