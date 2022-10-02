// 1번 R, T
// 2번 C, F
// 3번 J, M
// 4번 A, N

// 성격유형은 총 16가지가 나올수 있음 RFMN, TCMA같은 성격

// 검사지는 n개의 질문이 있고 각 질문에는 7개의 선택지가 있음

// 매우 비동의, 비동의, 약간비동의, 모르겠음, 약간동의, 동의, 매우 동의
// 각 질문지는 1가지 지표로 성격유형점수를 판단함
// 네오 3, 네오 2, 네오 1, 0, 어피치 1, 어피치 2, 어피치 3

// survey 길이 = n <= 1000
// survey의 원소는 "RT", "TR", "FC", "CF", "MJ", "JM", "AN", "NA" 중 하나
// survey 첫번쨰 캐릭터는 비동의 했을때 받는 성격
// survey 두번째 캐릭터는 동의 했을때 받는 성격

// choices 길이 = survey 길이
// choice 는
// choices	뜻
// 1	매우 비동의
// 2	비동의
// 3	약간 비동의
// 4	모르겠음
// 5	약간 동의
// 6	동의
// 7	매우 동의

function solution(survey, choices) {
  const score = [0, 3, 2, 1, 0, 1, 2, 3];
  const category = ["R", "T", "C", "F", "J", "M", "A", "N"];
  const select = Array(8).fill(0);
  let result = "";

  // 집계
  for (let i = 0; i < survey.length; i++) {
    const [agree, disagree] = survey[i];
    const chooseNumber = choices[i];

    if (chooseNumber < 4) {
      select[category.indexOf(agree)] += score[chooseNumber];
    } else if (chooseNumber > 4) {
      select[category.indexOf(disagree)] += score[chooseNumber];
    }
  }

  // 결과 구하기
  for (let i = 0; i < 4; i++) {
    const [sumLeft, sumRight] = select.slice(i * 2, i * 2 + 2);
    const [cateLeft, cateRight] = category.slice(i * 2, i * 2 + 2);
    const orderFirst = [cateLeft, cateRight].sort()[0];

    if (sumLeft === sumRight) result += orderFirst;
    else if (sumLeft > sumRight) result += cateLeft;
    else result += cateRight;
  }

  return result;
}

const a = solution(["TR", "RT", "TR"], [7, 1, 3]);
console.log(a);
