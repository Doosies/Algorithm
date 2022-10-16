function solution(price, money, count) {
  let result = price;
  for (let i = 2; i <= count; i++) {
    result += price * i;
  }
  result = money - result;
  return result < 0 ? result * -1 : 0;
}

console.log(solution(3, 20, 4));
