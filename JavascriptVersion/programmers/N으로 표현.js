function solution(N, number) {
  const dp = new Array(9).fill(0).map(() => new Set());
  for (let i = 1; i < 9; i++) {
    dp[i].add('1'.repeat(i) * N);
    for (let j = 1; j <= ((i / 2) >> 0) + 2; j++) {
      for (const a of dp[j]) {
        for (const b of dp[i - j]) {
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(a * b);
          dp[i].add((a / b) >> 0);
        }
      }
    }
    if (dp[i].has(number)) return i;
  }
  return -1;
}

console.log(solution(6, 5));
