const stdin = (
  process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
10 50
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON NNNNNNNNNNNNYNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
FENDER YYYNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON YYYNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNYNNNNYYYYYY
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
GIBSON NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
FENDER NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ');
})();

const [N, M] = input().map(Number);
const guitars = [];

let guitarNum = -1;
let songNum = -1;

// 2진수로 입력해둠
for (let i = 0; i < N; i++) {
  const [_, song] = input();
  guitars.push(
    BigInt(
      '0b' +
        song
          .split('')
          .map(v => (v === 'Y' ? 1 : 0))
          .join(''),
    ),
  );
}

// 기타 n개 선택했더니 현재 노래보다 많은경우 선택
// 기타 n개 선택하니 현재 노래랑 같은데 기타수가 더 적으면 선택
const recur = (end, start = 0, arr = [], sum = 0n) => {
  if (sum > 0) {
    const songCnt = sum.toString(2).match(/1/gi).length;
    const guitarCnt = arr.length;

    if (songCnt > songNum || (songCnt === songNum && guitarCnt < guitarNum)) {
      songNum = songCnt;
      guitarNum = guitarCnt;
    }
  }
  if (arr.length === end) {
    return;
  }

  for (let i = start; i < N; i++) {
    recur(end, i + 1, [...arr, i], sum | guitars[i]);
  }
};

for (let i = 0; i <= N; i++) {
  recur(i);
}
console.log(guitarNum);

console.log(0xf000);
