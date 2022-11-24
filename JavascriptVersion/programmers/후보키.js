const solution = relation => {
  const rowSize = relation.length;
  const colSize = relation[0].length;
  const answers = [];
  const combis = [];

  // console.log(rowSize, colSize);
  const getCombis = (size, now = 0, arr = []) => {
    if (arr.length === size) {
      combis.push(arr);
      return;
    }

    for (let i = now; i < colSize; i++) {
      getCombis(size, i + 1, [...arr, i]);
    }
  };

  for (let i = 1; i <= colSize; i++) {
    getCombis(i);
  }

  const canCandidateKey = combi => {
    const candidate = new Set();
    // 해당 조합으로 row가 똑같은지 봐봄
    relation.forEach(cols => {
      const key = [];
      combi.forEach(order => {
        key.push(cols[order]);
      });
      candidate.add(key.join('-'));
    });

    // 만약 해당 조합으로 중복이 없다면 후보키 가능
    if (candidate.size === rowSize) return true;
    return false;
  };

  combis.forEach(combi => {
    // 만약 해당 조합으로 중복이 있다면 후보키가 안됨
    if (!canCandidateKey(combi)) return;

    let isAllEmptySet = true;
    for (let answer of answers) {
      const intersection = answer.filter(c => combi.includes(c));
      // 교집합의 크기가 answer과 같다 = 키가 겹친다.
      if (intersection.length === answer.length) {
        isAllEmptySet = false;
        break;
      }
    }

    if (isAllEmptySet) {
      answers.push(combi);
    }
  });

  console.log(answers);
  console.log(combis);
  return answers.length;
};

const a = [
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
];
const b = [
  ['a', 1, 'aaa', 'c', 'ng'],
  ['b', 1, 'bbb', 'c', 'g'],
  ['c', 1, 'aaa', 'd', 'ng'],
  ['d', 2, 'bbb', 'd', 'ng'],
];
const c = [
  ['a', '1', 'aaa', 'c', 'ng'],
  ['a', '1', 'bbb', 'e', 'g'],
  ['c', '1', 'aaa', 'd', 'ng'],
  ['d', '2', 'bbb', 'd', 'ng'],
];
const d = [['100'], ['200']];

console.log(solution(a));
console.log(solution(b));
console.log(solution(c));
console.log(solution(d));
