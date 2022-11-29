const solution = board => {
  const result = [0, 0];
  const isEverySameNumber = (sy, sx, ey, ex, first) => {
    for (let i = sy; i < ey; i++) {
      if (board[i].slice(sx, ex).some(e => e !== first)) return false;
    }
    return true;
  };

  const dfs = (sy, sx, size) => {
    const first = board[sy][sx];
    if (isEverySameNumber(sy, sx, sy + size, sx + size, first)) {
      result[first]++;
      return;
    }

    const newSize = size / 2;
    dfs(sy, sx, newSize);
    dfs(sy + newSize, sx, newSize);
    dfs(sy, sx + newSize, newSize);
    dfs(sy + newSize, sx + newSize, newSize);
  };

  dfs(0, 0, board.length);
  return result;
};

console.log(
  solution([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ]),
);
