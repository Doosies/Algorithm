// 뒤에서부터 배달 빼봄, 가장 먼 거리 갱신
// 뒤에서부터 수거 빼봄, 가장 먼 거리 갱신
// 만약 해당값이 현재 배달, 수거의 cap을 초과할경우 cap이 찰 수 있을만큼만 빼고 스택에 넣음
// 만약 두개의 스택 길이가 0
function solution(cap, n, deliveries, pickups) {
  const 배달 = [];
  const 픽업 = [];
  let 결과 = 0;

  deliveries.forEach((delivery, i) => {
    배달.push([i + 1, delivery]);
  });
  pickups.forEach((pickup, i) => {
    픽업.push([i + 1, pickup]);
  });

  function 갔다가제일먼위치얻어오기(짐스택) {
    let 짐칸 = 0;
    let 제일먼위치 = 0;
    while (짐스택.length) {
      if (짐칸 === cap && 짐스택.at(-1)[1] !== 0) break;
      const [현재위치, 짐개수] = 짐스택.pop();

      if (짐개수 !== 0) {
        제일먼위치 = 현재위치 > 제일먼위치 ? 현재위치 : 제일먼위치;
      }
      짐칸 += 짐개수;

      if (짐칸 > cap) {
        짐스택.push([현재위치, 짐칸 - cap]);
        짐칸 = cap;
      }
    }
    return 제일먼위치;
  }

  // 배달 스택에서 하나 뺌
  // 해당 짐개수 + 배달짐칸 > cap 이라면 짐을 cap만큼만 뺌
  // 짐개수 4개, 짐칸 2, cap 5일때
  // = (짐개수 + 짐칸) - cap 을 다시 스택에 push하고 while 종료
  while (배달.length || 픽업.length) {
    const 배달먼위치 = 갔다가제일먼위치얻어오기(배달);
    const 픽업먼위치 = 갔다가제일먼위치얻어오기(픽업);

    결과 += Math.max(배달먼위치, 픽업먼위치) * 2;
  }
  return 결과;
}
console.log(solution(1, 5, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]));
// console.log(solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]));
// console.log(solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]));
// 24
// 10 + 6 + 6

// 배달 [1, 0, 3, 0, 0] 5
// 픽업 [0, 1, 0, 0, 0] 5

// [0,1] [1,0] [2,3]   4배달     8
// [0,0] [1,3] [2,0]   3수거

// 배달 [1, 0, 1, 0]	1
// 수거 [0, 1, 0, 0]  1

// 14 10
