//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
5 8
100 99 60 80 30 20 10 89 99 100
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

// 로봇이 이동하려면 칸에 로봇x, 내구도 1이상
// 올리는 위치 내구도 0 아니면 위치에 로봇 올림
// 내구도 0칸이 k 이상이라면 종료. 그렇지 않다면 1번으로 돌아감

// 1. 벨트가 한칸 이동함.
// 2. 제일 오른쪽에 있는 로봇부터 이동할 수 있다면 한칸 이동, 해당칸 내구도 -1
//   2-1. 조건: 이동하려는칸 로봇 없어야함, 내구도 1 이상 남아야함.
// 3. 올리는 위치 내구도 0 아니면 로봇 올림, 해당 칸 내구도 -1
// 4. 내구도 0칸 k개 이상이면 과정 종료, 아니면 1 ~3반복

const [n, K] = input();
const N = n - 1;
let belt = input().map(el => [el, false]); // 0: 내구도, 1: 로봇 있는지 여부
let kcnt = 0;
let loop = 0;

const dropLastRobot = () => {
  const [hp, onRobot] = belt[N];
  if (!onRobot) return;

  belt[N] = [hp, false];
};

const rotate = () => {
  belt = [belt.at(-1), ...belt.slice(0, -1)];
  const [hp, onRobot] = belt[N];
  if (!onRobot) return;
};

const moveRobots = () => {
  // N칸에는 로봇이 무조건 없으므로 N-1부터 확인함
  for (let pos = N - 1; pos >= 0; pos--) {
    const [hp, onRobot] = belt[pos];
    const [nextHp, nextOnRobot] = belt[pos + 1];
    // 현재칸에 로봇이 없거나, 다음칸에 로봇이 있다면 넘김
    if (!onRobot || nextOnRobot) continue;
    // 다음칸의 내구도가 남지 않았다면 넘김
    if (nextHp === 0) continue;

    belt[pos] = [hp, false];
    belt[pos + 1] = [nextHp - 1, true];
    if (nextHp - 1 === 0) kcnt++;
  }
};

const putRobot = () => {
  const [hp, onRobot] = belt[0];
  if (hp === 0) return;

  belt[0] = [hp - 1, true];
  if (hp - 1 === 0) kcnt++;
};

while (kcnt < K) {
  rotate();
  dropLastRobot();

  moveRobots();
  dropLastRobot();

  putRobot();
  loop++;
}

console.log(loop);
