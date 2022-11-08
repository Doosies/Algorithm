function getPermutation(input, end, result = [], tmp = []) {
  if (tmp.length === end) {
    result.push(tmp);
    return;
  }

  for (let i = 0; i < input.length; i++) {
    getPermutation(input, end, result, [...tmp, input[i]]);
  }

  return result;
}

function solution(users, emoticons) {
  const permus = getPermutation([10, 20, 30, 40], emoticons.length);
  const usersInfo = [];
  const permusResult = [];
  let result = [];

  users.forEach(([minPercent, maxPrice]) => {
    const nowUserInfo = [];
    const nowUserTotalBuyAmount = [];
    permus.forEach((discountPercent) => {
      const info = [];
      // emoticons 순환
      for (let i = 0; i < emoticons.length; i++) {
        // 현재 이모티콘의 할인율이 유저가 원하는것보다 낮으면
        // 현재 할인율에서 현재 아이콘은 구입 안함
        if (discountPercent[i] < minPercent) {
          info.push(0);
        }
        // 유저가 원하는 할인율 이상이라면
        // 현재 할인율에서 현재 아이콘 구입함
        else {
          info.push(emoticons[i] * (100 - discountPercent[i]) * 0.01);
        }
      }
      nowUserInfo.push(info);
    });

    nowUserInfo.forEach((nowPermu) => {
      // 물건 구매액 합계
      const totalBuyPrice = nowPermu.reduce((acc, cur) => acc + cur, 0);
      nowUserTotalBuyAmount.push(totalBuyPrice > 0 ? totalBuyPrice : 0);
    });
    usersInfo.push(nowUserTotalBuyAmount);
  });

  // 순열 수만큼 순환
  for (let i = 0; i < permus.length; i++) {
    // 현재 순열에서 가입자수
    let nowJoinCount = 0;
    // 구매액
    let nowAmountTotal = 0;

    // 유저 수만큼 순환
    for (let j = 0; j < users.length; j++) {
      // 현재 유저가 원하는 최대가격 이상이라면 가입자수 증가
      if (usersInfo[j][i] >= users[j][1]) {
        nowJoinCount++;
      }
      // 0도 아니고 최대가격 미만이라면 이모티콘 구매
      else {
        nowAmountTotal += usersInfo[j][i];
      }
    }
    permusResult.push([nowJoinCount, nowAmountTotal]);
  }

  result = permusResult.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  console.log(result);
  return result[0];
}
const result = solution(
  [
    [40, 2900],
    [23, 10000],
    [11, 5200],
    [5, 5900],
    [40, 3100],
    [27, 9200],
    [32, 6900],
  ],
  [1300, 1500, 1600, 4900]
);
console.log(result);
