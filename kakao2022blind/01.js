// 개인정보 n개, 약관마다 보관 유효기간 정해져있음
// 개인정보가 어떤 약관으로 수집됐는지 알고있음.
// 유효기간이 지나면 파기해야함
// 모든 달은 28일까지 있음
// 기간이 지났는지 판별하는 함수
function isExpired(today, collectDay, max) {
  //1년 = 336일
  //1달 = 28일
  //1일 = 24시간
  let nowDate = today.split(".");
  nowDate = +nowDate[0] * 336 + +nowDate[1] * 28 + +nowDate[2];

  let collectDate = collectDay.split(".");
  collectDate = +collectDate[0] * 336 + +collectDate[1] * 28 + +collectDate[2];

  // 현재일자 - 수집일자 >= 최대 보관기간 = 만료
  if (Math.abs(nowDate - collectDate) >= max) return true;
  else return false;
}

// 파기해야할 개인정보 배열로 나타냄
function solution(today, terms, privacies) {
  const termsObj = {};
  const result = [];

  // 약관 기간 초기화
  terms.forEach((term) => {
    const [termName, termMonth] = term.split(" ");
    termsObj[termName] = termMonth * 28;
  });

  privacies.forEach((privacy, idx) => {
    const [collectDate, termName] = privacy.split(" ");
    if (isExpired(today, collectDate, termsObj[termName])) {
      result.push(idx + 1);
    }
  });
  return result;
}
// const a = "2022.05.19";
const a = "2020.01.01";
// const b = ["A 6", "B 12", "C 3"];
const b = ["Z 3", "D 5"];
// const c = ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"];
const c = [
  "2019.01.01 D",
  "2019.11.15 Z",
  "2019.08.02 D",
  "2019.07.01 D",
  "2018.12.28 Z",
];
const result = solution(a, b, c);
console.log(result);
//
