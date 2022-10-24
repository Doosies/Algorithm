const input = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
4 1
6 13
4 8
3 6
5 12`
)
  .trim()
  .split('\n')
  .map(e => e.split(' ').map(e => +e));

// n=4, k=7
const [n, k] = input[0];
// 1~7 dp 배열
const dp = Array(k + 1).fill(0);

// dp[x] = 무게 x 에 넣을수있는 최대가치
// 6 13
// 4 8
// 3 6
// 5 12
// 1: 0, 2: 0, 3: 0, 4: 8, 5: 8, 6: 13, 7: 13
for (let i = 0; i < n; i++) {
  // weight, value 입력받음
  const [w, v] = input[i + 1];
  // 현재 물건 weight ~ 무게 최대치 까지만 2번쨰 for문 돌림
  for (let j = w; j <= k; j++)
    // dp [j] = max(dp[j], dp[주어진 무게j - 현재 물건 무게w] + 가치)
    // j6, w4, dp[6] = 13, dp[6-4] = 0 + 8
    dp[j] = Math.max(dp[j], dp[j - w] + v);
}
console.log(Math.max(...dp));
