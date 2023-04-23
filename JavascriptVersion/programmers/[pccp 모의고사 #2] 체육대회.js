const solution = ability => {
  const studentLen = ability.length;
  const abilityLen = ability[0].length;
  const visited = Array(studentLen).fill(false);
  let max = 0;

  const permu = (p = []) => {
    if (p.length === abilityLen) {
      let sum = p.reduce((s, n, i) => (s += ability[p[i]][i]), 0);
      max = max < sum ? sum : max;
      return;
    }
    for (let i = 0; i < studentLen; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      permu([...p, i]);
      visited[i] = false;
    }
  };
  permu();
  return max;
};

//     10 * 10 = 100 ->
// 매년 체육대회함
// '여러 종목'에 대해 각반의 종목 대표가 1명씩 나와 대결
// 한 학생은 최대 한개의 종목 대표 가능
// 강 종목 대표의 능력치의 합을 최대화 하는게 목표
