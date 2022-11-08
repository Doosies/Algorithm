function solution(n, a, b) {
  let result = 0;
  for (let i = 2; i <= n; i *= 2) {
    const div = i / 2;
    const left = Math.ceil(a / i);
    const right = Math.ceil(b / i);

    result++;
    if (left === right) {
      return result;
    }
  }
}

console.log(solution(16, 7, 9));
