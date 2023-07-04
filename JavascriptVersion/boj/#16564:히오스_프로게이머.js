// 문제링크: https://www.acmicpc.net/problem/16564
// 시작날짜: 2023.07.04
// 시작시간: 15:47
// 종료시간: 16:27
// 소요시간: 00:40

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
3 30
1
1
1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [N, K] = input();
const levels = Array.from({ length: N }, () => +input()).sort((a, b) => a - b);

// 해당 레벨을 달성하려면 몇레벨이 필요한지 구함.
const getLeftLevel = goal => {
  let leftLevel = K;
  for (const level of levels) {
    if (level < goal) {
      leftLevel -= goal - level;
    } else {
      break;
    }
  }
  return leftLevel;
};

let left = 1;
let right = 1000000001;

// N개의 캐릭터가 있음
// 각 캐릭터 레벨은 Xi임
// 최대 총합 K만큼 레벨을 올릴 수 있음

// 팀 목표레벨 T = min(Xi)
// 게임이 끝날때 까지 달성할 수 있는 최대 팀 목표레벨 T는?

while (left <= right) {
  const mid = ~~((left + right) / 2);

  // 레벨이 0개이상 있으면 중앙 ~ 오른쪽 탐색해봄
  if (getLeftLevel(mid) >= 0) {
    left = mid + 1;
  }
  // 레벨이 모자르면 왼쪽 ~ 중앙 탐색해봄
  else {
    right = mid - 1;
  }
}

console.log(right);
