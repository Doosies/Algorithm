/*
 * 조합을 찾는 함수 (순열에서 중복되지 않는 값들? ) -> 1 2, 2 1 두개는 불가능
 * input: 조합을 찾을 입력값들
 * end: 찾을 조합의 개수
 */
function getCombination(input, end, start = 0, result = [], tmp = []) {
  if (tmp.length === end) {
    result.push(tmp);
    return;
  }

  for (let i = start; i < input.length; i++) {
    getCombination(input, end, i + 1, result, [...tmp, input[i]]);
  }

  return result;
}

/*
 * 순열을 찾는 함수 (모든 경우의 수를 출력) -> 1 2, 2 1 두개 가능
 * input: 조합을 찾을 입력값들
 * end: 찾을 조합의 개수
 */
function getPermutation(input, end, result = [], tmp = []) {
  if (tmp.length === end) {
    result.push(tmp);
    return;
  }

  const lastVal = tmp[tmp.length - 1];
  for (let i = 1; i <= input.length; i++) {
    if (i !== lastVal) {
      getPermutation(input, end, result, [...tmp, i]);
    }
  }

  return result;
}
