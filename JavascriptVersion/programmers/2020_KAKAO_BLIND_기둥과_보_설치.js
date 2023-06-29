//시작날짜: 2023.06.22
//시작시간: 19:01
//종료시간: 22:18
//소요시간: 02:17

function 기둥_설치_가능(y, x, gi, bo) {
  if (y === 0 || bo[y][x]) return true;
  if (x > 0 && bo[y][x - 1]) return true;
  if (y > 0 && gi[y - 1][x]) return true;

  return false;
}
function 보_설치_가능(y, x, gi, bo) {
  if (y > 0 && gi[y - 1][x]) return true;
  if (y > 0 && x + 1 < gi.length && gi[y - 1][x + 1]) return true;
  if (x > 0 && x + 1 < bo.length && bo[y][x - 1] && bo[y][x + 1]) return true;

  return false;
}
function 제거후_설치가능(result, gi, bo) {
  for (const [x, y, type] of result) {
    if (type === 0 && !기둥_설치_가능(y, x, gi, bo)) return false;
    if (type === 1 && !보_설치_가능(y, x, gi, bo)) return false;
  }
  return true;
}
function tryDelete(type, result, gi, bo, y, x) {
  if (type === 0) gi[y][x] = false;
  else bo[y][x] = false;

  if (제거후_설치가능(result, gi, bo)) {
    const idx = result.findIndex(([xx, yy, aa]) => xx === x && yy === y && aa === type);
    if (idx > -1) result.splice(idx, 1);
  } else {
    if (type === 0) gi[y][x] = true;
    else bo[y][x] = true;
  }
}
function solution(n, build_frame) {
  const bo = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => false));
  const gi = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => false));
  const result = [];
  console.log(bo.length, gi.length);

  // a = 0 기둥, 1 보
  // b = 0 삭제, 1 설치
  build_frame.forEach(([x, y, a, b]) => {
    if (b === 1) {
      if (a === 0 && 기둥_설치_가능(y, x, gi, bo)) {
        gi[y][x] = true;
        result.push([x, y, a]);
      } else if (a === 1 && 보_설치_가능(y, x, gi, bo)) {
        bo[y][x] = true;
        result.push([x, y, a]);
      }
    } else if (b === 0) {
      tryDelete(a, result, gi, bo, y, x);
    }
  });

  result.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;

    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;

    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
  });
  return result;
}

console.log(
  solution(5, [
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 0, 0, 1],
    [2, 1, 1, 1],
    [2, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [3, 0, 0, 1],
    [2, 0, 0, 0],
    [1, 1, 0, 0],
    // [1, 1, 0, 1],
    // [1, 1, 1, 0],
    // [1, 0, 0, 0],
    // [0, 1, 1, 0],
  ]),
);
console.log(
  solution(5, [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [2, 1, 0, 1],
    [2, 2, 1, 1],
    [5, 0, 0, 1],
    [5, 1, 0, 1],
    [4, 2, 1, 1],
    [3, 2, 1, 1],
  ]),
);

console.log(
  solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ]),
);
