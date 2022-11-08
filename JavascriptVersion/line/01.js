function getArrSize(beforeSize) {
  let size = 1;
  while (size < beforeSize) {
    size *= 2;
  }
  return size;
}

function solution(queries) {
  // array[i][0] = i번쨰 array의 원소수
  // array[i][1] = i번쨰 array 배열의 크기
  const array = Array.from({ length: 1001 }, () => [0, 0]);
  let copyCnt = 0;
  queries.forEach(([arrNum, addNum]) => {
    const beforeElementCnt = array[arrNum][0];
    const beforeArraySize = array[arrNum][1];
    // 만약 0이라면 배열의 크기를 초기화해줌, cnt는 증가하지 않음
    if (beforeArraySize === 0) {
      array[arrNum] = [addNum, getArrSize(addNum)];
      // 0이 아니라면 비교함,
    } else {
      array[arrNum] = [beforeElementCnt + addNum, getArrSize(addNum)];
      // 현재 추가할 원소 + 기존원소 > 현재 배열의 길이라면
      if (addNum > beforeArraySize) {
        // 1. copyCnt += 기존 원소 갯수
        // 2. array[arrNum] = [기존원소 + 추가할원소, 새로운배열길이]
        copyCnt += beforeElementCnt;
      }
    }
  });
  return copyCnt;
}
