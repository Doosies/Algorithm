function isPrime(num) {
  if (!num || num === 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(n, k) {
  return n
    .toString(k)
    .split('0')
    .filter(v => isPrime(+v)).length;
}

console.log(solution(437674, 2));
// console.log(solution(110011, 10));
// console.log(solution(2, 3));
// console.log(solution(110, 10));

// // console.log((1000000).toString(8));
// console.log((100000).toString(2));

// 11000011010100000
// console.log(object);
