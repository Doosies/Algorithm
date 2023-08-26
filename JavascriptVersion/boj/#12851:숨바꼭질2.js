// 문제링크: https://www.acmicpc.net/problem/12851
// 시작날짜: 2023.08.26
// 시작시간: 18:43
// 종료시간: 19:03
// 소요시간: 00:20

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
5 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, M] = input();
const dist = Array.from({ length: 100_001 }, () => Infinity);
const isInRange = pos => pos >= 0 && pos < 100_001;

const q = new Queue();
let resultCnt = 0;
let resultCost = Infinity;

q.push([N, 0]);

// 예외상황: 현재 cost보다 더 작은 cost 나왔을 때
// 예외상황: N이 M보다 클 때
while (!q.isEmpty()) {
  const [pos, cost] = q.pop();

  if (pos === M && cost < resultCost) {
    resultCnt = 1;
    resultCost = cost;
  } else if (pos === M && cost === resultCost) {
    resultCnt++;
  }

  if (pos > Math.max(N, M) + 1) continue;
  if (dist[pos] < cost) continue;
  dist[pos] = cost;

  if (isInRange(pos + 1)) q.push([pos + 1, cost + 1]);
  if (isInRange(pos - 1)) q.push([pos - 1, cost + 1]);
  if (isInRange(pos * 2)) q.push([pos * 2, cost + 1]);
}

console.log(resultCost);
console.log(resultCnt);
// X일때 걸으면 1초후 x-1 or x+1
// X일때 순간동 1초후 2*X로 이동

// 수빈: 점 N
// 동생: 점 K
