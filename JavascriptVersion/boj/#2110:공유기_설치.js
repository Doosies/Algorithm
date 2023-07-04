// 문제링크:
// 시작날짜: 2023.07.04
// 시작시간: 14:00
// 종료시간: 15:44
// 소요시간: 01:44

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
6 3
1
2
8
4
50
100
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const [N, C] = input();
const poses = Array.from({ length: N }, () => +input()).sort((a, b) => a - b);

const installedWifiNum = dist => {
  let cnt = 1;
  let before = poses[0];
  for (let i = 1; i < poses.length; i++) {
    const now = poses[i];
    if (now - before >= dist) {
      cnt++;
      before = now;
    }
  }
  return cnt;
};

let left = 0;
let right = poses.at(-1);

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  // 현재 범위로 했을 때 모든 공유기 둘 수 있다면
  //   -> 더 큰 범위로 공유기 둘 수 있는지 확인함
  // 공유기 둘 수 없다면
  //   -> 더 작은 범위로 공유기 둘 수 있는지 확인함.
  // console.log(left, right, mid, installedWifiNum(mid));
  if (installedWifiNum(mid) >= C) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
console.log(right);

// 1 2 4 8 9

// 2: -1 0 2 6 7
// 3: -2 -1 1 5 6
// 4: -3 -2 0 4 5
