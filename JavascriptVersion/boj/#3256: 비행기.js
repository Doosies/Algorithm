const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
50
21
18
26
10
37
45
2
13
50
26
19
32
29
18
45
19
13
13
34
2
49
44
22
31
17
6
5
20
40
23
10
10
40
35
21
29
29
25
43
30
50
12
14
31
31
8
49
45
23
35
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => +stdin[line++]; //.split(' ').map(v => +v);
})();

const solution = () => {
  const p = Array.from({ length: input() }, () => input());
  const q = Array(1001).fill(-1);
  const stayedTime = {};
  let resultTime = -1;

  const loop = condition => {
    let result = 0;
    // 조건이 insert일경우 맨 앞에 넣을수 있는지봄 : q가 전부 -1인지 봄
    while (condition === 'insert' ? q[0] !== -1 : !q.every(v => v === -1)) {
      for (let j = 1000; j > 0; j--) {
        // 만약 현재 위치에서 짐을 싣는중이라면
        if (j === q[j]) {
          // 시간 -1
          stayedTime[j]--;
          // 짐을 전부 실었으면
          if (stayedTime[q[j]] === 0) {
            delete stayedTime[q[j]];
            q[j] = -1;
          }
        }
        // 현재 위치가 비었고// 현재 위치가 5초 지났고// 현재 위치가 내가 가는곳 이하이면
        // 오른쪾으로 옮김
        if (j <= q[j - 1] && q[j] === -1) {
          q[j] = q[j - 1];
          q[j - 1] = -1;
          if (j === q[j]) {
            stayedTime[q[j]] = 5;
          }
        }
      }
      result++;
    }
    return result;
  };

  for (let i = 0; i < p.length; i++) {
    q[0] = p[i];
    // 만약 들어갈 자리가 없다면 생길때까지 만듬.
    resultTime += loop('insert');
  }
  // 모두 자리에 앉을때까지 반복
  resultTime += loop('move');

  return resultTime;
};

console.log(solution());
