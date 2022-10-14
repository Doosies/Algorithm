function getDist(now, target) {
  // |x1 - x2| + |y1 - y2|
  return Math.abs(now[0] - target[0]) + Math.abs(now[1] - target[1]);
}
function solution(numbers, hand) {
  // 1[0, 0] 2[0, 1] 3[0, 2]
  // 4[1, 0] 5[1, 1] 6[1, 2]
  // 7[2, 0] 8[2, 1] 9[2, 2]
  // *[3, 0] 0[3, 1] #[3, 2]
  const pos = [
    [3, 1],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
    [3, 0],
    [3, 2],
  ];
  const onlyLeft = [1, 4, 7];
  const onlyRight = [3, 6, 9];
  let result = '';
  let left = pos[10];
  let right = pos[11];

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    // 왼쪽손만 갈수 있는곳이라면
    if (onlyLeft.some(v => v === num)) {
      result += 'L';
      left = pos[num];
    }
    // 오른손만 갈수 있는곳이라면
    else if (onlyRight.some(v => v === num)) {
      result += 'R';
      right = pos[num];
    }
    // 양쪽손 다 갈수 있는곳이라면
    else {
      const lDist = getDist(left, pos[num]);
      const rDist = getDist(right, pos[num]);

      if (lDist < rDist) {
        result += 'L';
        left = pos[num];
      } else if (lDist > rDist) {
        result += 'R';
        right = pos[num];
      } else {
        if (hand === 'left') {
          result += 'L';
          left = pos[num];
        } else {
          result += 'R';
          right = pos[num];
        }
      }
    }
  }
  return result;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));
