// 문제링크: https://www.acmicpc.net/problem/13549
// 시작날짜: 2023.08.26
// 시작시간: 19:08
// 종료시간: 19:27 ( 19: 30, 실행시간 단축)
// 소요시간: 00:19 ( 00: 22, 실행시간 단축)

class Queue {
  L = 0;
  R = 0;
  S = {};
  pushBack(data) {
    this.S[this.R++] = data;
  }
  pushFront(data) {
    this.S[--this.L] = data;
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
10 14
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, M] = input();
const visit = Array.from({ length: 100001 }, () => false);
const isInRange = pos => pos >= 0 && pos < 100001;

const q = new Queue();

q.pushBack([N, 0]);

while (!q.isEmpty()) {
  const [pos, cost] = q.pop();

  if (pos === M) {
    console.log(cost);
    return;
  }

  if (visit[pos]) continue;
  visit[pos] = true;

  if (isInRange(pos + 1)) {
    q.pushBack([pos + 1, cost + 1]);
  }
  if (isInRange(pos - 1)) {
    q.pushBack([pos - 1, cost + 1]);
  }
  if (isInRange(pos * 2)) {
    q.pushFront([pos * 2, cost]);
  }
}

// X일때 걸으면 1초후 x-1 or x+1
// X일때 순간동 1초후 2*X로 이동

// 수빈: 점 N
// 동생: 점 K
