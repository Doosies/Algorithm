// const solution = (n, stations, w) => {
//   const apts = Array(n + 1).fill(0);
//   const range = w * 2 + 1;
//   let cnt = 0;
//   let rst = 0;
//   let now = 0;

//   stations.forEach(station => {
//     for (let i = station - w; i <= station + w; i++) {
//       apts[i] = 1;
//     }
//   });

//   for (let i = 1; i <= n; i++) {
//     const apt = apts[i];
//     if (apt === 0) {
//       now = 0;
//       cnt++;
//       if (cnt === range) {
//         cnt = 0;
//         rst++;
//       }
//     }
//     if (apt === 1 && now === 0) {
//       if (cnt > 0) rst++;
//       now = 1;
//       cnt = 0;
//     }
//   }
//   if (cnt > 0) rst++;
//   return rst;
// };

const solution = (n, stations, w) => {
  const range = w * 2 + 1;
  let result = 0;
  let lastCoverage = 1;

  stations.forEach(now => {
    const right = now - w - 1;
    const coverRange = right - lastCoverage + 1;
    const needStationNum = Math.ceil(coverRange / range);

    result += needStationNum;
    lastCoverage = now + w + 1;
  });
  if (lastCoverage <= n) {
    const coverRange = n - lastCoverage + 1;
    const needStationNum = Math.ceil(coverRange / range);
    result += needStationNum;
  }

  return result;
};

console.log(solution(11, [4, 11], 1));
console.log(solution(16, [9], 2));
console.log(solution(3, [1], 1));

// 1 2 3, 4 5 6, 7 8 9, 10 11
//  4, 11
//  1, 4, 7, 10
//  X - - X - - X - - X -
//  2, 5, 8, 11
//  - X - - X - - X - - X
// [1 2 3 4 5 6 7 8 9 0 1]

// 첫번째 4에 두면 앞 범위는 2 -> ceil(2/3) = 0.6... = 1, 마지막 범위는 5
// 두번째 11에 두면 앞 범위는 6~9 = 4 -> ceil(4/3) = 1.3... = 2, 마지막 범위는 12
// 마지막 범위가 n보다 작다면 위 연산 한번더 수행
