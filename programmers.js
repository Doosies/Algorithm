// distance: 처음바위 ~ 끝바위 거리
// rocks: 바위들 위치
// n: 제거할 바위 개수
function combination(input, end, start = 0, result = [], tmp = []) {
  if (tmp.length === end) {
    result.push(tmp);
    return;
  }

  for (let i = start; i < input.length; i++) {
    combination(input, end, i + 1, result, [...tmp, input[i]]);
  }

  return result;
}

function solution(distance, rocks, n) {
  const rocksLen = rocks.length;
  const arr = Array.from({ length: rocksLen + 1 }, (_, i) => i);
  const combis = combination(arr, rocksLen - n);

  let minDist = [];
  let result = -1;

  rocks.sort((a, b) => a - b);

  minDist.push(rocks[0]);
  for (let i = 1; i < rocks.length; i++) {
    minDist.push(rocks[i] - rocks[i - 1]);
  }
  minDist.push(distance - rocks.at(-1));

  combis.forEach((combi) => {
    const temp = [...minDist];
    combi.forEach((idx) => {
      temp[idx] = 1000000001;
    });
    result = Math.max(result, Math.min(...temp));
  });

  return result;
}

const result = solution(10, [3, 5, 7], 2);
console.log(result);
