class Queue {
  constructor(data) {
    this.store = {};
    this.head = 0;
    this.tail = 0;
    data && this.push(data);
  }
  push = data => (this.store[this.tail++] = data);
  pop = () => (this.head === this.tail ? undefined : this.store[this.head++]);
}
