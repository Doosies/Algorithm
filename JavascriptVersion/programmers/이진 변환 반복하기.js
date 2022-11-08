function solution(s) {
  let changeCnt = 0;
  let zeroCnt = 0;
  while (s !== '1') {
    const beforeLen = s.length;
    const afterS = s.replaceAll('0', '');
    const afterLen = afterS.length;

    zeroCnt += beforeLen - afterLen;
    changeCnt++;
    s = afterLen.toString(2);
  }

  return [changeCnt, zeroCnt];
}

console.log(solution('10010101001'));
