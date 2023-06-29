function getBasketNum(ballNum, sqrt) {
  let basketCnt = 0;

  // 공개수 - sqrt(공개수)
  // if: 공개수 > 0
  // 공개수 - sqrt()
  while (ballNum > 0) {
    ballNum -= sqrt ** 2;
    basketCnt++;
    sqrt = Math.floor(Math.sqrt(ballNum));
  }
  return basketCnt;
}
function solution(n) {
  let sqrt = Math.floor(Math.sqrt(n));
  let result = Infinity;

  for (let i = 1; i <= sqrt; i++) {
    const basketNum = getBasketNum(n, i);
    result = result > basketNum ? basketNum : result;
  }
  return result;
}
