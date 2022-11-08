const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
7
6 6 0 1`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const solution = () => {
  const N = +input();
  const [sy, sx, ey, ex] = input();
  const movedCnt = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));
  // (r-2, c-1), (r-2, c+1), (r, c-2), (r, c+2), (r+2, c-1), (r+2, c+1)
  const nextMove = [
    // y,x
    [-2, -1],
    [-2, 1],
    [0, -2],
    [0, 2],
    [2, -1],
    [2, 1],
  ];
  const q = []; //new MinHeap();

  const canMove = (y, x) => {
    if (y >= 0 && y < N && x >= 0 && x < N) return true;
    return false;
  };

  // [y, x, dist, moved]
  q.push([sy, sx, ey + ex, 0]);
  while (q.length > 0) {
    const [y, x, dist, moved] = q.shift(); //q.pop();

    if (dist === 0) return moved;
    console.log(y, x, dist, moved);

    for (const [ny, nx] of nextMove) {
      const [py, px] = [ny + y, nx + x];
      if (!canMove(py, px)) continue;
      if (movedCnt[py][px] <= moved + 1) continue;

      const nextDist = Math.abs(px - ex) + Math.abs(py - ey);
      movedCnt[py][px] = moved + 1;
      q.push([py, px, nextDist, moved + 1]);
    }
  }
  return -1;
};

console.log(solution());
// }

// console.log(movedCnt);

// }

//
