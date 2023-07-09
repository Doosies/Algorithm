// 문제링크: https://www.acmicpc.net/problem/1074
// 시작날짜: 2023.07.09
// 시작시간: 15:00
// 종료시간: 16:08
// 소요시간: 01:08

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
10 511 511
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();
const [N, r, c] = input();

// 남은게 1개 될때까지 쪼갬
// 시작row, 시작 col에서부터
const dfs = (ord, nowLen, startRow, startCol) => {
  const nextLen = nowLen / 2;
  const next2Len = nextLen / 2;

  if (nowLen === 1) {
    console.log(ord);
    return;
  }
  if (r < startRow && c < startCol) {
    dfs(ord, nextLen, startRow - next2Len, startCol - next2Len);
  }
  if (r < startRow && c >= startCol) {
    dfs(ord + nextLen ** 2, nextLen, startRow - next2Len, startCol + next2Len);
  }
  if (r >= startRow && c < startCol) {
    dfs(ord + nextLen ** 2 * 2, nextLen, startRow + next2Len, startCol - next2Len);
  }
  if (r >= startRow && c >= startCol) {
    dfs(ord + nextLen ** 2 * 3, nextLen, startRow + next2Len, startCol + next2Len);
  }
};

dfs(0, 2 ** N, 2 ** N / 2, 2 ** N / 2);

// 1. 4개중 어디에 있는지 판단.
// 2. 왼쪽 위라면 숫자 더함 x,
// 3. 오른쪽 위라면 (가로길이)^2를 앞에 더해줌
// 4. 왼쪽 아래라면 (가로길이)^2 *2 를 앞에 더해줌
// 5. 오른쪽 아래라면(가로길이)^2 * 3 을 앞에 더해줌
// 6. 가로길이가 1이 될때까지 반복.

// 가로길이 8일때
// 왼위: r <  8/2 && c <  8/2
// 오위: r <  8/2 && c >= 8/2
// 왼아: r >= 8/2 && c <  8/2
// 오아: r >= 8/2 && c >= 8/2
