const solution = (n, info) => {
  let sameResult = [];
  let result = Array(11).fill(0);
  let maxDifference = 0;

  const getApeachScore = () => {
    let score = 0;
    for (let i = 0; i < 11; i++) {
      if (info[i] !== 0 && result[i] === 0) score += 10 - i;
    }
    return score;
  };
  const dfs = (now, leftArrow, nowScore) => {
    if (now === 11) {
      let difference = nowScore - getApeachScore();
      let tmpResult = [...result];

      if (leftArrow > 0) tmpResult[10] = leftArrow;
      if (difference > maxDifference) {
        maxDifference = difference;
        sameResult = [[...tmpResult]];
      } else if (difference === maxDifference) {
        sameResult.push(tmpResult);
      }
    }
    for (let i = now; i < 11; i++) {
      const score = 10 - i;
      if (info[i] < leftArrow) {
        result[i] = info[i] + 1;
        dfs(i + 1, leftArrow - info[i] - 1, nowScore + score);
        result[i] = 0;
      } else {
        dfs(i + 1, leftArrow, nowScore);
      }
    }
  };

  dfs(0, n, 0);

  sameResult.sort((a, b) => {
    for (let i = 10; i >= 0; i--) {
      if (a[i] !== b[i]) return b[i] - i[i];
    }
  });
  return maxDifference === 0 ? [-1] : sameResult[0];
};

console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
// 5
// 2 1 1 1 0 0 0 0 0 0 0
// 1
// 1 0 0 0 0 0 0 0 0 0 0
// 9
// 0 0 1 2 0 1 1 1 1 1 1
// 10
// 0 0 0 0 0 0 0 0 3 4 3
