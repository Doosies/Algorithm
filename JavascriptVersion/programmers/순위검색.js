// 모든 경우의수에 1을 더하는 재귀함수
function countUserByCombi(now, info, score, combi) {
  const key = info.join('');
  const val = combi[key];

  if (val) combi[key].push(score);
  else combi[key] = [score];

  for (let i = now; i < 4; i++) {
    const infoTmp = [...info];
    infoTmp[i] = '-';
    countUserByCombi(i + 1, infoTmp, score, combi);
  }
}

// 해당 그룹에서 2진탐색으로 점수를 찾음
function search(scoreObject) {
  const { minScore, scores } = scoreObject;
  if (scores.length === 0) return 0;

  let l = 0;
  let r = scores.length;
  let m = Math.floor((l + r) / 2);

  while (l < r) {
    m = Math.floor((l + r) / 2);
    if (scores[m] < minScore) l = m + 1;
    else r = m;
  }

  return scores.length - l;
}

function solution(infos, querys) {
  const combi = {};
  const group = [];
  const result = [];

  // info들의 경우으수에 해당 점수를 구함
  for (let info of infos) {
    info = info.split(' ');
    const score = +info.pop();
    countUserByCombi(0, info, score, combi);
  }
  // combi들을 정렬해줌
  for (const key in combi) {
    combi[key].sort((a, b) => a - b);
  }

  // 해당 쿼리에 맞는 값을 가져옴
  for (let query of querys) {
    query = query.split(' ').filter(q => q !== 'and');
    const minScore = +query.pop();

    group.push({
      minScore,
      scores: combi[query.join('')] ?? [],
    });
  }

  // 값을 이진탐색해서 가져옴
  for (const objects of group) {
    result.push(search(objects));
  }

  return result;
}

console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ],
  ),
);
