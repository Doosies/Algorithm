function solution(board, moves) {
  const stacks = [];
  const bucketStack = [];
  let result = 0;

  for (let i = 0; i < board.length; i++) {
    stacks.push([]);
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[j][i] !== 0) {
        stacks[i].push(board[j][i]);
      }
    }
  }

  for (let i = 0; i < moves.length; i++) {
    const idx = moves[i] - 1;
    const now = stacks[idx].pop();
    if (!now) continue;

    if (now === bucketStack.at(-1)) {
      bucketStack.pop();
      result += 2;
    } else {
      bucketStack.push(now);
    }
  }

  return result;
}
