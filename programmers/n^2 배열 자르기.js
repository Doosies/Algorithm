// 시도1
// function solution(n, left, right) {
//   return Array.from({ length: n }, (_, i) =>
//     Array.from({ length: n }, (_, j) => (j <= i ? i + 1 : j + 1)),
//   )
//     .reduce((sum, now) => [...sum, ...now], [])
//     .slice(left, right + 1);
// }

// 시도2
// function solution(n, left, right) {
//   let now = 0;
//   let result = [];

//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (now >= left && now <= right) {
//         result.push(j <= i ? i : j);
//       }
//       now++;
//     }
//   }
//   return result;
// }

function solution(n, left, right) {
  const result = [];

  for (let i = left; i <= right; i++) {
    const quotient = Math.floor(i / n) + 1;
    const remainder = i % n || n;
    result.push(remainder <= quotient ? quotient : remainder);
  }

  return result;
}
console.log(solution(3, 1, 2));

// 몫: quotient
// 나머지: remainder
