const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
7 7
2 0 0 0 1 1 0
0 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

// N: 세로, M: 가로
const [N, M] = input();
const board = Array.from({ length: N }, () => input());
const isInBoard = (y, x) => y >= 0 && y < N && x >= 0 && x < M;
const beforeWallCnt = board.flat().filter(v => v === 1).length;

const next = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let maxEmptySpace = 0;
const twoPosotions = [];

// 2가 있는위치를 찾음
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) {
      twoPosotions.push([i, j, 0]);
    }
  }
}

const getSafeSpace = board => {
  const queue = [...twoPosotions];
  let virus = 0;

  while (queue.length) {
    const [nowY, nowX, nowVirus] = queue.shift();
    // 현재 보드가 0이 아니고, 바이러스 퍼트린 횟수 1보다 크면
    if (board[nowY][nowX] !== 0 && nowVirus > 0) continue;

    board[nowY][nowX] = 2;
    virus++;

    for (const [nextY, nextX] of next) {
      const [ny, nx] = [nextY + nowY, nextX + nowX];
      if (!isInBoard(ny, nx) || board[ny][nx] !== 0) continue;

      if (board[ny][nx] === 0) {
        queue.push([ny, nx, nowVirus + 1]);
      }
    }
  }

  return N * M - beforeWallCnt - virus - 3;
};

// 1. dfs로 벅의 위치를 바꿔준다.
const dfs = (y, x, wallCnt = 0) => {
  // 벽 3개 세웠으면 바이러스를 퍼트려서 0의 개수를 확인함.
  if (wallCnt === 3) {
    const nowBoard = board.map(v => [...v]);

    // 2. bfs로 2를 꽉 채운후 0의 개수 리턴해준다.
    const emptySpaceCnt = getSafeSpace(nowBoard);
    // 3. maxEmptySpace와 비교한다.
    if (maxEmptySpace < emptySpaceCnt) {
      maxEmptySpace = emptySpaceCnt;
    }

    return;
  }

  for (let i = y; i < N; i++) {
    x = i === y ? x : 0;
    for (let j = x; j < M; j++) {
      if (board[i][j] === 0) {
        board[i][j] = 2;
        dfs(i, j + 1, wallCnt + 1);
        board[i][j] = 0;
      }
    }
  }
};

dfs(0, 0);
console.log(maxEmptySpace);
