function solution(A, B) {
  let answer = 0;
  let j = 0;
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);

  for (let i = 0; i < A.length; i++) {
    if (A[i] < B[j]) {
      answer++;
      j++;
    }
  }
  return answer;
}

const a = [5, 1, 3, 7];
const b = [2, 2, 6, 8];
console.log(solution(a, b));
