// 문제링크: https://www.acmicpc.net/problem/15787
// 시작날짜: 2023.08.24
// 시작시간: 14:01
// 종료시간: 15:08
// 소요시간: 01:07

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
5 5
1 1 1
1 1 2
1 2 2
1 2 3
3 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

// N개의 기차가 어둠을 헤치고 은하수를 건넌다.
const [N, M] = input();
const trains = Array.from({ length: N }, () => 0);
const passed = new Map();

const commands = Array.from({ length: M }, () => input());
const command = {
  1: (train, seat) => join(train, seat),
  2: (train, seat) => out(train, seat),
  3: train => goForward(train),
  4: train => goBack(train),
};

// 1 i x: i번째 기차, x번째 좌석 사람 태우기
const join = (train, seat) => {
  trains[train] |= 1 << seat;
};
// 2 i x: i번째 기차, x번째 좌석 사람 빼기
const out = (train, seat) => {
  trains[train] &= ~(1 << seat);
};
// 3 i: i번째 기차의 승객을 모두 +1한다. 20번째 승객은 없앤다.
const goForward = train => {
  const slicedShift = (trains[train] << 1).toString(2).slice(-20);
  trains[train] = parseInt(slicedShift, 2);
};
// 4 i: i번쨰 기차의 승객을 모두 -1한다. 1번째 승객은 없앤다.
const goBack = train => {
  trains[train] >>= 1;
};

commands.forEach(cmd => {
  command[cmd[0]](cmd[1] - 1, cmd[2] - 1);
});

trains.forEach(train => {
  passed.set(train, true);
});

console.log(passed.size);
