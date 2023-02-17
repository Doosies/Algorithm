const sol = (gates, airlines) => {
  const answer = new Set();
  let nowGate = [];

  const check = (day, gates, airlines, flag) => {
    if (gates.every(e => e === 0)) {
      answer.add(day);
      return true;
    }
    if (flag) return;

    for (let i = 0; i < gates.length; i++) {
      if (gates[i] === 0) continue;
      for (let j = 0; j < airlines.length; j++) {
        if (gates[i] > airlines[j]) continue;
        const airlineOrg = airlines[j];
        const gateOrg = gates[i];

        airlines[j] -= gates[i];
        gates[i] = 0;
        flag = check(day, gates, airlines, flag);
        airlines[j] = airlineOrg;
        gates[i] = gateOrg;
      }
    }
    return flag;
  };
  gates.forEach((gate, day) => {
    nowGate = gate;
    check(day + 1, nowGate, airlines, false);
  });

  return answer.size;
};

console.log(
  sol(
    [
      [1, 1, 5, 3],
      [2, 2, 3, 3],
      [1, 1, 4, 4],
      [1, 0, 3, 6],
      [0, 2, 5, 3],
    ],
    [3, 2, 5],
  ),
);

const a = arr => {
  arr[0] = 10;
};

// const b = [1, 2, 3, 4];
// a(b);
// console.log(b);
