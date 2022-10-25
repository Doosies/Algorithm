const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
1
4
0 0 0 1
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const n = +input();
const jewels = [];
const sums = [];
let resultSum = 0;
let resultStr = '';

for (let i = 0; i < n; i++) {
  input();
  const jewel = input();
  jewels.push(jewel);

  // 구간합 구하는 for문
  const sum = [jewel[0]]; // 구간합
  for (let j = 1; j < jewel.length; j++) {
    sum[j] = sum[j - 1] + jewel[j];
  }
  sums.push(sum);
}

sums.forEach((nowSum, nowJewelIdx) => {
  let max = -Infinity;
  let order = [];
  // i = 시작
  for (let i = 0; i < nowSum.length; i++) {
    // j = 끝
    for (let j = i; j < nowSum.length; j++) {
      const sum =
        sums[nowJewelIdx][j] - sums[nowJewelIdx][i] + jewels[nowJewelIdx][i];
      if (sum > max) {
        max = sum;
        order = [i, j];
      } else if (sum === max) {
        // 구간이 더 짧은거 우선 || 시작위치가 더 빠른거 우선
        if (order[1] - order[0] > j - i || order[0] > i) {
          order = [i, j];
        }
      }
    }
  }
  resultSum += max;
  resultStr += `${order[0] + 1} ${order[1] + 1}\n`;
});

console.log(resultSum);
console.log(resultStr);
