function solution(cap, n, deliveries, pickups) {
  const array = Array(n)
    .fill(0)
    .map((_, i) => -deliveries[i] + pickups[i]);
  // 현재 트럭에 실린 물건
  // 0 이상, cap 이하의 값이 들어갈 수 있음
  const truck = cap;
  let time = 0;
  console.log(array.reduce((sum, now) => sum + now, 0));

  const recur = (arr, luggage) => {
    if (arr.every((a) => a === 0)) {
      console.log("end", arr, luggage);
      return;
    }
    arr.forEach((num, i) => {
      const nowLuggage = num + luggage;
      // 싣거나 내릴 수 있으면
      if (nowLuggage >= 0 && nowLuggage <= cap) {
        arr[i] -= num;
        recur(arr, nowLuggage);
      }
    });
  };

  recur(array, truck);
  // console.log(array.reduce((sum, now) => (sum += now)));
}

const result = solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]);
console.log(result);
