const downBoard = (m, n, board) => {
  const newBoard = board.map(b => [...b]);
  let movedCnt = 0;

  // 보드에서 내릴 부분들을 찾음
  // 세로 = i, 가로 = j
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (board[i][j] !== 0) {
        const now = board[i][j];
        // 네방향이 같다면
        if (
          board[i + 1][j] === now &&
          board[i][j + 1] === now &&
          board[i + 1][j + 1] === now
        ) {
          newBoard[i][j] = 0;
          newBoard[i + 1][j] = 0;
          newBoard[i][j + 1] = 0;
          newBoard[i + 1][j + 1] = 0;
        }
      }
    }
  }

  // 보드에서 0인부분들을 내려버림
  // i = 가로, j = 세로
  for (let i = 0; i < n; i++) {
    let zeroCnt = 0;
    let zeroStart = -1;
    let moved = false;

    // 아래 -> 위로 탐색
    for (let j = m - 1; j >= 0; j--) {
      const now = newBoard[j][i];
      // 현재 위치가 비었다면
      if (now === 0) {
        // 0을 만난적이 있고, 그래서 블럭을 내렸고, 다시 0을 만났다면
        if (zeroStart !== -1 && moved) {
          moved = false;
          zeroCnt = 0;
        }
        zeroCnt++;
      }
      // 아래에 0이 있었다면
      else if (zeroCnt > 0) {
        moved = true;
        movedCnt++;
        // zeroCnt만큼 아래로 내림
        [newBoard[j + zeroCnt][i], newBoard[j][i]] = [
          newBoard[j][i],
          newBoard[j + zeroCnt][i],
        ];
      }
    }
  }

  return [movedCnt, newBoard];
};
const countZero = (m, n, board) => {
  let zeroCnt = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 0) zeroCnt++;
    }
  }
  return zeroCnt;
};

// 높이m, 폭n
function solution(m, n, board) {
  board = board.map(v => v.split(''));
  while (true) {
    const [movedCnt, newBoard] = downBoard(m, n, board);
    board = newBoard;
    if (movedCnt === 0) break;
  }
  return countZero(m, n, board);
}

const a = ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'];
const b = ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ'];

console.log(solution(4, 5, a));
console.log(solution(6, 6, b));
