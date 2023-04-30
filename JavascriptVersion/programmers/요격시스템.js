function solution(targets = []) {
  targets.sort((a, b) => a[1] - b[1]);
  let [end, missile] = [targets[0][1], 1];

  for (let [s, e] of targets) {
    if (s >= end) {
      missile++;
      end = e;
    }
  }

  return missile;
}

console.log(
  solution([
    [4, 5],
    [4, 8],
    [10, 14],
    [11, 13],
    [5, 12],
    [3, 7],
    [1, 4],
  ]),
);
