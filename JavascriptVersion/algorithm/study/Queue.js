class Queue {
  constructor(data) {
    this.store = new Map();
    this.head = 0;
    this.tail = 0;
    data && this.push(data);
  }
  push = data => (this.store[this.tail++] = data);
  pop = () => {
    if (this.head === this.tail) {
      return undefined;
    } else {
      const data = this.store[this.head];
      delete this.store[this.head++];
      return data;
    }
  };
}
