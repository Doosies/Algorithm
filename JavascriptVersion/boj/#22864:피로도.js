// 문제링크: https://www.acmicpc.net/problem/22864
// 시작날짜: 2023.08.24
// 시작시간: 13:53
// 종료시간: 13:59
// 소요시간: 00:06

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
11 5 1 10
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

// 하루에 한시간 단위로 일을 하거나 쉰다.
// 1. 한시간 일하면 피로도 A만큼 쌓임, B만큼 이 처리가능
// 2. 한시간 쉬면 피로도 C만큼 감소, 단, 음수되면 0됨.

// 피로도가 최대한 M을 넘지않게 일을 하려고 한다.
// M을 넘으면 번아웃이 와서 일을 그만둔다.

// 24시간동안 얼마나 많은 일을 할수 있는지?

// A: 쌓이는 피로도
// B: 처리 가능한 일
// C: 휴식시 감소하는 피로도
// M: 최대 피로도

const [A, B, C, M] = input();
let worked = 0;
let tired = 0;

for (let i = 0; i < 24; i++) {
  if (tired + A <= M) {
    tired += A;
    worked += B;
  } else {
    tired -= C;
  }

  if (tired < 0) {
    tired = 0;
  }
}

console.log(worked);
