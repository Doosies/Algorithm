function solution(numbers) {
  let result = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9;
  return result - numbers.reduce((sum, now) => sum + now, 0);
}

console.log(solution([1, 2, 3, 4, 6, 7, 8, 0]));
const a = ''.toLowerCase();
