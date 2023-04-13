class Node {
  before = null;
  data = null;
  constructor(data) {
    this.data = data;
  }
}

class Stack {
  #bottom = null;
  #top = null;
  length = 0;

  push(data) {
    const node = new Node(data);

    if (!this.#bottom) {
      this.#bottom = node;
    } else {
      node.before = this.#top;
    }

    this.#top = node;
    this.length++;
  }
  pop = () => {
    if (this.length) {
      const data = this.#top.data;
      this.#top = this.#top.before;
      this.length--;
      return data;
    }
  };
}

class Stack2 {
  #top = 0;
  #stack = {};

  push(data) {
    this.#stack[this.#top++] = data;
  }
  pop() {
    const idx = --this.#top;
    const data = this.#stack[idx];
    delete this.#stack[idx];
    return data;
  }
}

const s = new Stack2();
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
