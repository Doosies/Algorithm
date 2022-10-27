function solution(s) {
  const reg = /(?<={)(.*?)(?=})/g;
  const tmp = s
    .slice(1)
    .match(reg)
    .map(s => s.split(',').map(Number))
    .sort((a, b) => (a.length < b.length ? -1 : 1));

  let result = [tmp[0][0]];
  for (let i = 1; i < tmp.length; i++) {
    const filter = tmp[i].filter(el => !tmp[i - 1].includes(el));
    result[i] = filter[0];
  }
  return result;
}

console.log(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}'));
