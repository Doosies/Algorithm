// 문제링크: https://www.acmicpc.net/problem/1697
// 시작날짜: 2023.08.26
// 시작시간: 18:29
// 종료시간: 18:42
// 소요시간: 00:13

class Queue {
  L = 0;
  R = 0;
  S = {};
  push(data) {
    this.S[this.R++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.S[this.L];
    delete this.S[this.L++];
    return result;
  }
  isEmpty() {
    return this.L === this.R;
  }
}
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
5 17
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, M] = input();
const visited = Array.from({ length: 100_001 }, () => false);
const isInRange = pos => pos >= 0 && pos < 100_001;

const q = new Queue();
q.push([N, 0]);

while (!q.isEmpty()) {
  const [pos, cost] = q.pop();

  if (pos === M) {
    console.log(cost);
    return;
  }

  if (isInRange(pos + 1) && !visited[pos + 1]) {
    q.push([pos + 1, cost + 1]);
    visited[pos + 1] = true;
  }
  if (isInRange(pos - 1) && !visited[pos - 1]) {
    q.push([pos - 1, cost + 1]);
    visited[pos - 1] = true;
  }
  if (isInRange(pos * 2) && !visited[pos * 2]) {
    q.push([pos * 2, cost + 1]);
    visited[pos * 2] = true;
  }
}

// X일때 걸으면 1초후 x-1 or x+1
// X일때 순간동 1초후 2*X로 이동

// 수빈: 점 N
// 동생: 점 K
