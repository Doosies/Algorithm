function solution(user_id, banned_id) {
  const banned_len = banned_id.length;
  const answer = new Set();

  const isBlackUser = (uid, bid) => {
    if (uid.length !== bid.length) return false;

    for (let i = 0; i < uid.length; i++) {
      if (bid[i] === '*') continue;
      if (uid[i] !== bid[i]) return false;
    }
    return true;
  };

  const dfs = (now, users) => {
    if (users.length === banned_len) {
      answer.add(users.join(','));
    }
    for (let i = now; i < user_id.length; i++) {
      for (let j = 0; j < banned_id.length; j++) {
        if (isBlackUser(user_id[i], banned_id[j])) {
          const tmp = banned_id[j];
          banned_id.splice(j, 1);
          dfs(i + 1, [...users, user_id[i]]);
          banned_id.splice(j, 0, tmp);
        } else {
          dfs(i + 1, users);
        }
      }
    }
  };

  dfs(0, []);

  return answer.size;
}

console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']));
console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['*rodo', '*rodo', '******']));
console.log(solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', '*rodo', '******', '******']));
// console.log(solution(['song']));
