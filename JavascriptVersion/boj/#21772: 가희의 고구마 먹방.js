const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
11 11 13
........G..
......S.#S.
........#.S
........#.S
........#..
.##########
.##########
...........
...........
##########.
...........
`
)
  .trim()
  .split('\n');
let line = 0;
const input = (() => {
  return () => stdin[line++].split(' ').map(v => +v);
})();
const input2 = (() => {
  return () => stdin[line++].split('');
})();

const [R, C, T] = input();
const board = Array.from({ length: R }, () => input2());
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0),
);
const pos = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
];
const start = { y: -1, x: -1 };

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === 'G') {
      start.y = i;
      start.x = j;
    }
  }
}

const canNotGoNext = (y, x) => {
  if (y >= 0 && y < R && x >= 0 && x < C && board[y][x] !== '#') {
    return false;
  }
  return true;
};

let max = 0;

const dfs = (v, y, x, t = 0, s = 0, path = []) => {
  if (board[y][x] === 'S' && visited[y][x] === 0) {
    s++;
  }
  if (t === T) {
    max = Math.max(s, max);
    return;
  }

  for (let i = 0; i < pos.length; i++) {
    const [ny, nx] = [pos[i][0] + y, pos[i][1] + x];
    if (canNotGoNext(ny, nx)) continue;

    v[y][x] += 1;
    dfs(v, ny, nx, t + 1, s, [...path, [ny, nx]]);
    v[y][x] -= 1;
  }
};

dfs(visited, start.y, start.x);
console.log(max);
