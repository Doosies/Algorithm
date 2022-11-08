function solution(msg) {
  const dict = {};
  const result = [];

  // 1 ~ 26 = A ~ Z로 사전 초기화
  for (let i = 65; i <= 90; i++) {
    dict[String.fromCharCode(i)] = i - 64;
  }

  // 현재 idx 위치부터 가장 긴 문자열을 찾아서 리턴하는 함수
  const findLongStr = idx => {
    let str = '';
    let result = '';
    for (let i = idx; i < msg.length; i++) {
      str += msg[i];
      if (dict[str]) {
        result = str;
      }
    }
    return result;
  };

  for (let i = 0; i < msg.length; i++) {
    // 사전 안에 있는 가장긴 문자열을 찾음
    const longStr = findLongStr(i);
    // 바로 다음 문자열의 위치
    const nextStrPos = i + longStr.length;
    // 바로 다음 문자열 위치가 msg 밖에 있다면 break;
    if (nextStrPos > msg.length) break;
    // 결과를 넣어둠
    result.push(dict[longStr]);
    // 가장긴 문자열과 바로 다음 문자열을 합친걸 사전에 넣음
    dict[longStr + msg[nextStrPos]] = Object.keys(dict).length + 1;
    // 탐색하는 부분이 가장긴 문자열 다음으로 되도록 변경
    i += longStr.length - 1;
  }
  return result;
}

const inputs = ['KAKAO', 'TOBEORNOTTOBEORTOBEORNOT', 'ABABABABABABABAB'];
inputs.forEach(input => {
  console.log(solution(input));
});

// 65 ~ 90
