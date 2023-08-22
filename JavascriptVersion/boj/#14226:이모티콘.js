// // 문제링크: https://www.acmicpc.net/problem/14226
// // 시작날짜: 2023.08.22
// // 시작시간: 15:25
// // 종료시간: 17:50
// // 소요시간: 02:25

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
// //const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const stdin = `15`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const S = +input();
const q = new Queue();
const memo = {};

q.push({ time: 0, emoticon: 1, clipboard: 0, trace: [] });

while (!q.isEmpty()) {
  const { time, emoticon, clipboard } = q.pop();
  if (emoticon === S) {
    console.log(time);
    return;
  }

  const key = `${emoticon},${clipboard}`;
  if (memo[key]) continue;
  memo[key] = time;

  // 화면에 있는 이모티콘 모두 복사해 클립보드에 저장
  q.push({ time: time + 1, emoticon, clipboard: emoticon });
  // 클립보드에 있는 모든 이모티콘 화면에 붙여넣기
  q.push({ time: time + 1, emoticon: emoticon + clipboard, clipboard });
  // 화면에 있는 이모티콘 한개 삭제
  q.push({ time: time + 1, emoticon: emoticon - 1, clipboard });
}
