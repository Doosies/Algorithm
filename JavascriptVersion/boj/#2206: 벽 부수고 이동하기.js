class Queue {
  q = {};
  left = 0;
  right = 0;
  push(data) {
    this.q[this.right++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.q[this.left];
    delete this.q[this.left++];
    return result;
  }
  isEmpty = () => this.left === this.right;
}

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
9 9
010001010
010101010
010101010
010101010
010101010
010101010
010101010
010101010
000100010
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return (isSpace) => stdin[l++].split(isSpace ? ' ' : '').map(Number);})();

const [N, M] = input(true);
const map = Array.from({ length: N }, () => input(false));
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [false, false]));

const next = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const q = new Queue();
q.push([0, 0, 1, false]);

const isInBoard = (y, x) => y >= 0 && y < N && x >= 0 && x < M;

while (!q.isEmpty()) {
  const [y, x, dist, breaked] = q.pop();

  if (y === N - 1 && x === M - 1) {
    console.log(dist);
    return;
  }

  for (let [py, px] of next) {
    // 다음 갈 곳
    const [ny, nx] = [y + py, x + px];

    // 다음 장소가 보드 밖이라면 못감
    if (!isInBoard(ny, nx)) continue;

    // 다음장소가 벽이고 부순적이 없고 방문한적 없으면 부서버림
    if (map[ny][nx] === 1 && !breaked && !visited[ny][nx][1]) {
      visited[ny][nx][1] = true;
      q.push([ny, nx, dist + 1, true]);
    }
    // 다음장소가 벽이 아니고 방문한적 없으면
    if (map[ny][nx] === 0 && !visited[ny][nx][breaked]) {
      visited[ny][nx][breaked] = true;
      q.push([ny, nx, dist + 1, breaked]);
    }
  }
}

if ((N === M) === 1) console.log(1);
else console.log(-1);
