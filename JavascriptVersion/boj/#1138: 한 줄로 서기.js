const stdin = (
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8")
    : `
7
6 1 1 1 2 0 0
`
)
  .trim()
  .split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(" ").map((v) => +v);
})();

const N = +input();
const peoples = input();
const maybe = Array.from({ length: N }, () => []);
const result = Array.from({ length: N }, () => 0);

for (let i = 1; i < N; i++) {
  const biggerThan = peoples[i];
  for (let j = biggerThan; j < N; j++) {
    maybe[j].push(i + 1);
  }
}
// result[peoples[0]] = peoples[0];
maybe[peoples[0]] = [1];

for (let i = 0; i < N; i++) {
  const nowPosition = maybe[i];
  // 경우의 수가 하나라면
  if (nowPosition.length === 1) {
    result[i] = +nowPosition;

    // maybe에서 nowPosition 제거
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < maybe[j].length; k++) {
        if (maybe[j][k] === +nowPosition) {
          maybe[j].splice(k, 1);
        }
      }
    }
    continue;
  }
  // 해당 위치의 경우의 수를 모두 탐색함
  for (let j = 0; j < nowPosition.length; j++) {
    const nowMaybe = nowPosition[j];

    // 만약 현재 위치에 0이아닌 숫자가 있다면
    // 해당 위치는 벌써 탐색이 완료된거니 다음으로 넘어감
    // 만약 nowMaybe가 result에 있다면 다음 위치로 넘어감
    if (result[i] !== 0 || result.includes(nowMaybe)) {
      continue;
    }

    // 현재 위치가 0이라면 앞에 큰 사람이 몇명 있는지 탐색함
    // 큰 사람의 갯수가 같다면 result[k] = nowMaybe후 break; -> 다음 위치를 탐색함
    let biggerThanMe = 0;
    for (let k = 0; k <= i; k++) {
      if (result[k] > nowMaybe) {
        biggerThanMe++;
      }
      if (
        biggerThanMe === peoples[nowMaybe - 1] &&
        Math.min(nowPosition[j], nowMaybe) === nowMaybe
      ) {
        result[i] = nowMaybe;
        break;
      }
    }
  }
}

console.log(result.join(" "));
