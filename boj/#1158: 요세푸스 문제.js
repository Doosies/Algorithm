const stdin = (
  process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8') : `7 3`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

class L {
  list = { now: 0, next: null };
  head = this.list;
  tail = this.list;
  beforeNode = this.head;
  nowNode = this.head;
  len = 0;

  push(number) {
    this.tail.next = { val: number, next: null };
    this.tail = this.tail.next;
    this.tail.next = this.head;
    this.len++;

    if (this.head.now === 0) {
      this.head = this.head.next;
    }
  }
  pop(index) {
    for (let i = 0; i < index - 1; i++) {
      this.beforeNode = this.beforeNode.next;
    }
    this.nowNode = this.beforeNode.next;
    this.beforeNode.next = this.nowNode.next;
    this.len--;
    return this.nowNode.val;
  }
}
const solution = (N, K) => {
  const node = new L();
  const result = [];

  for (let i = 1; i <= N; i++) {
    node.push(i);
  }
  while (node.len > 0) {
    result.push(node.pop(K));
  }
  return `<${result.join(', ')}>`;
};

const [N, K] = input();
console.log(solution(N, K));
