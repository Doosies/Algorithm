function solution(user_id, banned_id) {
  const getPermu = (arr, rst) => {
    if (arr.length === banned_id.length) rst.push(arr);

    for (let i = 0; i < user_id.length; i++) {
      if (!arr.includes(user_id[i])) {
        getPermu([...arr, user_id[i]], rst);
      }
    }
    return rst;
  };

  const permus = getPermu([], []);
  const result = new Set();

  permus.forEach(permu => {
    let bannedUserCnt = 0;

    for (let i = 0; i < permu.length; i++) {
      const replaceBanned = banned_id[i].replaceAll('*', '.');
      const reg = new RegExp(`^${replaceBanned}$`);

      if (reg.test(permu[i])) bannedUserCnt++;
    }

    if (bannedUserCnt === banned_id.length) result.add(permu.sort().join(''));
  });

  return result.size;
}

console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']));
console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['*rodo', '*rodo', '******']));
console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', '*rodo', '******', '******']));
// console.log(solution(['song']));
