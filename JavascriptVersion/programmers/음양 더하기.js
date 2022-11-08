function solution(absolutes, signs) {
  let result = 0;
  for (let i = 0; i < absolutes.length; i++) {
    result += signs[i] ? absolutes[i] : -absolutes[i];
  }
  return result;
}

const a = [
  [4, 7, 12],
  [true, false, true],
];
const b = [
  [1, 2, 3],
  [false, false, true],
];

console.log(solution(a[0], a[1]));
console.log(solution(b[0], b[1]));
