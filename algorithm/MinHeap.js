// 최소힙
class MinHeap {
  #heap = [];
  #lastIdx = -1;

  constructor(arr = []) {
    this.#heap = arr;
    this.#lastIdx = arr.length - 1;
    // 만약 배열 크기가 1보다 크다면 최대힙으로 재정렬
    if (arr.length > 1) {
      for (let i = this.#parent(this.#lastIdx); i >= 0; i--) {
        this.#heapifyDown(i);
      }
    }
  }

  push(element) {
    this.#heap.push(element);
    this.#heapifyUp(++this.#lastIdx);
  }

  pop() {
    const lastIdx = this.#lastIdx--;
    if (lastIdx > -1) {
      [this.#heap[0], this.#heap[lastIdx]] = [
        this.#heap[lastIdx],
        this.#heap[0],
      ];

      const poped = this.#heap.pop();
      this.#heapifyDown(0);

      return poped;
    }
  }

  sort = () => {
    const beforeLastIdx = this.#lastIdx;
    const last = this.#lastIdx;

    for (let i = last; i >= 0; i--) {
      [this.#heap[i], this.#heap[0]] = [this.#heap[0], this.#heap[i]];
      this.#lastIdx--;
      this.#heapifyDown(0);
    }

    this.#lastIdx = beforeLastIdx;
  };

  isEmpty = () => (this.#heap.length > 0 ? false : true);
  getArray = () => this.#heap;
  length = () => this.#lastIdx + 1;

  #parent = (idx) => Math.floor((idx - 1) / 2);
  #left = (idx) => idx * 2 + 1;
  #right = (idx) => idx * 2 + 2;

  #heapifyUp = (nowIdx) => {
    let parentIdx = this.#parent(nowIdx);

    while (parentIdx > -1 && this.#heap[nowIdx] < this.#heap[parentIdx]) {
      [this.#heap[nowIdx], this.#heap[parentIdx]] = [
        this.#heap[parentIdx],
        this.#heap[nowIdx],
      ];
      nowIdx = parentIdx;
      parentIdx = this.#parent(nowIdx);
    }
  };

  #heapifyDown = (nowIdx) => {
    let left = this.#left(nowIdx);
    let right = this.#right(nowIdx);
    let swapIdx = left;

    if (left > this.#lastIdx) return;

    if (right < this.#lastIdx && this.#heap[left] > this.#heap[right]) {
      swapIdx = right;
    }

    if (this.#heap[nowIdx] > this.#heap[swapIdx]) {
      [this.#heap[nowIdx], this.#heap[swapIdx]] = [
        this.#heap[swapIdx],
        this.#heap[nowIdx],
      ];
    }
    this.#heapifyDown(swapIdx);
  };
}
