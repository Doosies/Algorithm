function isInBoard(y, x) {
  return y >= 0 && y < 5 && x >= 0 && x < 5;
}
function check(place) {
  const next = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (place[y][x] === 'X') continue;
      let pCnt = 0;

      for (const [yy, xx] of next) {
        const [ny, nx] = [yy + y, xx + x];

        if (!isInBoard(ny, nx)) continue;
        if (place[ny][nx] === 'P') pCnt++;
        if ((place[y][x] === 'O' && pCnt >= 2) || (place[y][x] === 'P' && pCnt === 1)) return 0;
      }
    }
  }
  return 1;
}
function solution(places) {
  const result = [];

  places.forEach(place => {
    place = place.map(row => row.split(''));
    result.push(check(place));
  });
  return result;
}

console.log(
  solution([
    ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
    ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
    ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
    ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
    ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
  ]),
);

[
  [0, -1],
  [0, -2],
  [-1, 0],
  [-2, 0],
  [-1, -1],
];
