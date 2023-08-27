// 문제링크: https://www.acmicpc.net/problem/3980
// 시작날짜: 2023.08.27
// 시작시간: 14:55
// 종료시간: 15:39
// 소요시간: 00:44

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
1
100 0 0 0 0 0 0 0 0 0 0
0 80 70 70 60 0 0 0 0 0 0
0 40 90 90 40 0 0 0 0 0 0
0 40 85 85 33 0 0 0 0 0 0
0 70 60 60 85 0 0 0 0 0 0
0 0 0 0 0 95 70 60 60 0 0
0 45 0 0 0 80 90 50 70 0 0
0 0 0 0 0 40 90 90 40 70 0
0 0 0 0 0 0 50 70 85 50 0
0 0 0 0 0 0 66 60 0 80 80
0 0 0 0 0 0 50 50 0 90 88
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const T = +input();

for (let t = 0; t < T; t++) {
  const scores = Array.from({ length: 11 }, () => input());

  let max = getPermutations(0, 0, scores, Array(11).fill(false), 0);
  console.log(max);
}

function getPermutations(now, sum, scores, visited, max) {
  if (now === 11) {
    return sum > max ? sum : max;
  }

  for (let i = 0; i < 11; i++) {
    // 전체탐색 하면 1억번 돈다!
    // 근데 값이 0은 더할 가치가 없어서 빼버리면 7천번 이내로 탐색 ㅆㄱㄴ
    if (scores[now][i] === 0) continue;
    if (visited[i]) continue;

    visited[i] = true;
    max = getPermutations(now + 1, sum + scores[now][i], scores, visited, max);
    visited[i] = false;
  }

  return max;
}
