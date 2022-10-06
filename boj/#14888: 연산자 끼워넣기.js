const stdin = (
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8")
    : `
2
5 6
0 0 1 0
`
)
  .trim()
  .split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(" ").map((v) => +v);
})();

const N = +input();
const nums = input();
const cals = input();

let min = Infinity;
let max = -Infinity;

const calculateSum = (arr) => {
  let sum = nums[0];

  for (let i = 1; i < N; i++) {
    const sign = arr[i - 1];

    if (sign === 0) sum += nums[i];
    else if (sign === 1) sum -= nums[i];
    else if (sign === 2) sum *= nums[i];
    // 음수 / 양수 : 양수로 바뀐뒤 몫 취하고 음수로 바꿈
    else {
      if (sum < 0) {
        sum = Math.floor(Math.abs(sum) / nums[i]) * -1;
      } else {
        sum = Math.floor(sum / nums[i]);
      }
    }
  }
  return sum;
};

const getPermutation = (arr, op) => {
  if (arr.length === N - 1) {
    const sum = calculateSum(arr);
    min = Math.min(min, sum);
    max = Math.max(max, sum);
    return;
  }
  for (let i = 0; i < 4; i++) {
    if (op[i] === 0) continue;
    const newOp = [...op];
    newOp[i]--;
    getPermutation([...arr, i], newOp);
  }
};

getPermutation([], cals);
console.log(`${max}\n${min}`);
