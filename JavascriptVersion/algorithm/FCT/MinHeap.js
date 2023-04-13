class MinHeap {
  #stor = [];

  push(data) {
    this.#stor.push(data);
    let now = this.#stor.length - 1;

    while (now > 0) {
      const parent = this.#getParent(now);

      if (this.#stor[now] < this.#stor[parent]) {
        this.#swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }

  pop() {
    let lastIdx = this.#getTailIdx();
    this.#swap(0, lastIdx);

    const data = this.#stor.pop();
    lastIdx -= 1;

    let now = 0;
    let left = 1;
    let right = 2;

    // 현재 노드의 왼쪽이 존재할 때 while문을 실행
    while (left <= lastIdx) {
      let changeIdx = left;

      // 오른쪽 노드가 존재함 && 왼쪽노드 > 오른쪽노드 경우 -> changeIdx = 오른쪽
      if (right <= lastIdx && this.#stor[left] > this.#stor[right]) {
        changeIdx = right;
      }

      // 현재 > 변경할 자식인 경우 swap
      if (this.#stor[now] > this.#stor[changeIdx]) {
        this.#swap(now, changeIdx);
        now = changeIdx;
        left = this.#getLeft(now);
        right = this.#getRight(now);
      } else {
        break;
      }
    }

    return data;
  }

  #getParent = idx => Math.floor((idx - 1) / 2);
  #getLeft = idx => idx * 2 + 1;
  #getRight = idx => idx * 2 + 2;
  #getTailIdx = () => this.#stor.length - 1;
  #swap = (a, b) => {
    [this.#stor[a], this.#stor[b]] = [this.#stor[b], this.#stor[a]];
  };
}
