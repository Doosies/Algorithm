const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `ConquerThePlanet`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++]; //.split(' ').map(v => v);
})();

const str = input();
let result = 0;
let activate = false;

const isL = num => (num >= 65 && num <= 90 ? true : false);
const isS = num => (num >= 97 && num <= 122 ? true : false);

for (let i = 0; i < str.length; i++) {
  const now = str[i].charCodeAt();
  if (i === str.length - 1) {
    result++;
    if ((activate && isS(now)) || (!activate && isL(now))) {
      result++;
    }
  } else {
    const next = str[i + 1].charCodeAt();
    result++;

    if (activate) {
      // 현재 소문자, 다음 대문자
      if (isS(now) && isL(next)) {
        result++;
      }
      // 현재 소문자, 다음 소문자
      else if (isS(now) && isS(next)) {
        activate = false;
        result++;
      }
    } else {
      // 현재 대문자, 다음 소문자
      if (isL(now) && isS(next)) {
        result++;
      }
      // 현재 대문자, 다음 대문자
      else if (isL(now) && isL(next)) {
        activate = true;
        result++;
      }
    }
  }
}
console.log(result);

// 대문자: 65 ~ 90
// 소문자: 97 ~ 122

// 비활성화 돼있고 현재 소문자, 다음 대문자일경우 -> 그냥침
// 비활성화 돼있고 현재 소문자, 다음 소문자일경우 -> 그냥침
// 비활성화 돼있고 현재 대문자, 다음 소문자일경우 -> 별 누르고 침
// 비활성화 돼있고 현재 대문자, 다음 대문자일경우 -> 마름모 누르고 침

// 활성화 돼있고 현재 소문자, 다음 대문자일경우 -> 별 누르고 침
// 활성화 돼있고 현재 소문자, 다음 소문자일경우 -> 마름모 누르고 침
// 황성화 돼있고 현재 대문자, 다음 소문자일경우 -> 그냥침
// 활성화 돼있고 현재 대문자, 다음 대문자일경우 -> 그냥침
