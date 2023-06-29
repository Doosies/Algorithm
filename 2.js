function solution(r, c) {
  const board = Array.from({ length: r }, () => Array.from({ length: c }, () => 1));

  for (let i = 1; i < r; i++) {
    for (let j = 1; j < c; j++) {
      board[i][j] = board[i][j - 1] + board[i - 1][j];
    }
  }
  return board[r - 1][c - 1];
}
