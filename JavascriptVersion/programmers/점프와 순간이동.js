function solution(n) {
  let result = 0;

  while (n > 0) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n -= 1;
      result++;
    }
  }
  return result;
}
// 순간이동하면 건전지사용량 줄지않음
// k칸 점프하면 k만큼의 건전지 사용
console.log(solution(5000));
