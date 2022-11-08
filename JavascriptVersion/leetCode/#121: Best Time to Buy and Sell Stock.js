var maxProfit = function (prices) {
  let min = Infinity;
  let result = -1;

  for (let i = 0; i < prices.length; i++) {
    // 현재 위치가 최솟값 이상이라면 그아래 안봄
    if (prices[i] >= min) continue;

    // 현재 위치가 최솟값보다 작다면
    min = prices[i];
    for (let j = i + 1; j < prices.length; j++) {
      result = Math.max(result, prices[j] - min);
    }
  }
  return result > 0 ? result : 0;
};

console.log(maxProfit([1, 2]));
