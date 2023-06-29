function alphabetToNum(alphabet) {
  return alphabet.charCodeAt() - 65;
}
function splitPosStringToArray(string) {
  let [y, x] = string.split('');
  y = alphabetToNum(y);
  x = Number(x) - 1;
  return [y, x];
}
function isInBoard(y, x) {
  return y >= 0 && y < 8 && x >= 0 && x < 8;
}

function solution(bishops) {
  const next = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const visited = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => false));
  let cnt = 0;

  bishops = bishops.map(bishop => splitPosStringToArray(bishop));

  bishops.forEach(([y, x]) => {
    for (const [yy, xx] of next) {
      for (let i = 0; i < 8; i++) {
        const [ny, nx] = [yy * i + y, xx * i + x];

        if (!isInBoard(ny, nx)) break;

        if (!visited[ny][nx]) cnt++;
        visited[ny][nx] = true;
      }
    }
  });

  return 64 - cnt;
}
