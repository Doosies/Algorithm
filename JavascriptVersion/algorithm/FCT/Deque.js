class Node {
  before = null;
  next = null;
  data = null;
  constructor(data) {
    this.data = data;
  }
}

class Deque {
  #head = null;
  #tail = null;
  length = 0;

  // 왼쪽 삽입
  pushFront(data) {
    const node = new Node(data);

    if (this.#head === null) {
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head.before = node;
    }

    this.#head = node;
    this.length++;
  }
  // 오른쪽 삽입
  pushBack(data) {
    const node = new Node(data);

    if (this.head === null) {
      this.#head = node;
    } else {
      node.before = this.#tail;
      this.#tail.next = node;
    }

    this.#tail = node;
    this.length++;
  }

  // 왼쪽 제거
  popFront() {
    if (this.#head === null) return undefined;

    const data = this.#head.data;

    if (this.#head.next === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.before = null;
    }

    this.length--;

    return data;
  }
  // 오른쪽 제거
  popBack() {
    if (this.#head === null) return undefined;

    const data = this.#tail.data;

    if (this.#tail.before === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.before;
      this.#tail.next = null;
    }

    if (this.#tail === null) this.#head = null;

    this.length--;

    return data;
  }

  isEmpty = () => this.length === 0;
}

class Deque2 {
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
