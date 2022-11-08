/** @format */

function solution(num) {
  let cnt = 0;

  while (num !== 1 && cnt < 500) {
    cnt++;

    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num = num * 3 + 1;
    }

    if (num === 1) {
      break;
    }
  }
  return cnt >= 500 ? -1 : cnt;
}

console.log(solution(1));
