function getTime(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
function solution(plans) {
  plans = plans
    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    .map(plan => [plan[0], getTime(plan[1]), +plan[2]]);
  plans.push(['', 100000, 100000]);

  const result = [];
  const waits = []; // 2순위

  for (let i = 1; i < plans.length; i++) {
    const [_, 현재_시작시간] = plans[i];
    const [이전_과목, 이전_시작시간, 이전_걸리는시간] = plans[i - 1];

    const 이전_예정종료시간 = 이전_시작시간 + 이전_걸리는시간;
    const 이전_남은_걸리는시간 = 이전_예정종료시간 - 현재_시작시간;

    // 이전 과목을 처리하지 못하면 waits에 남은시간과 함께 넣음
    if (현재_시작시간 < 이전_예정종료시간) {
      waits.push([이전_과목, 이전_남은_걸리는시간]);
    }
    // 처리했다면 result에 넣음
    else {
      result.push(이전_과목);
      // 만약 종료된 시간 < 현재_시작시간 이라면 -> waits 처리
      let 처리가능한_시간 = 현재_시작시간 - 이전_예정종료시간;
      while (waits.length && 이전_예정종료시간 < 현재_시작시간 && 처리가능한_시간 > 0) {
        const [과목, 걸리는시간] = waits.at(-1);
        if (처리가능한_시간 >= 걸리는시간) {
          처리가능한_시간 -= 걸리는시간;
          waits.pop();
          result.push(과목);
        } else {
          waits.at(-1)[1] -= 처리가능한_시간;
          처리가능한_시간 = 0;
        }
      }
    }
  }
  return result;
}
