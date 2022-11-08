const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : fs.readFileSync(__dirname + '/input.txt').toString()
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const solution = () => {
  // 일의 개수와 일할 수 있는 시간 동안 몇 개의 일을 처리할 수 있는지 알아볼 개수를 의미하는 정수
  const [N, M] = input();
  const todos = input();
  const times = Array.from({ length: M }, () => +input());
  const dp = [todos[0]];
  let result = '';

  const findIdx = findVal => {
    let left = 0;
    let right = dp.length - 1;
    let mid = 0;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (findVal === dp[mid]) {
        break;
      } else if (findVal <= dp[mid]) {
        right = mid - 1;
      } else if (findVal > dp[mid]) {
        left = mid + 1;
      }
    }
    if (dp[mid] > findVal) mid--;
    return mid + 1;
  };

  for (let i = 1; i < todos.length; i++) {
    dp[i] = dp[i - 1] + todos[i];
  }

  times.forEach(time => {
    result += `${findIdx(time)}\n`;
  });

  return result;
};

console.log(solution());
