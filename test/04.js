function solution(alp, cop, problems) {
  const goalAlp = Math.max(...problems.map((p) => p[0]), alp);
  const goalCop = Math.max(...problems.map((p) => p[1]), cop);

  const dp = Array.from({ length: goalAlp + 2 }, () =>
    Array.from({ length: goalCop + 2 }, () => 101)
  );

  dp[alp][cop] = 0;

  for (let i = alp; i < goalAlp; i++) {
    for (let j = cop; j < goalCop; j++) {
      // 알고리즘 공부한경우
      dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

      problems.forEach(([alpReq, copReq, alpRwd, copRwd, cost]) => {
        if (i >= alpReq && j >= copReq) {
          dp[i + alpRwd][j + copRwd] = Math.min(
            dp[i + alpRwd][j + copRwd],
            dp[i][j] + cost
          );
        }
      });
    }
  }

  // console.log(dp.at(-1).at(-1));
}

// 문제를 풀기 위해서는 일정 이상의 알고력과 코딩력이 필요하다.
// 알고력 1 상승 -> 1시간
// 코딩력 1 상승 -> 1시간
// 현재 풀수있는 문제 풀면 알고력, 코딩력 상승
//   - 문제마다 풀수있는 알고력, 코딩력 정해져있음
// 문제를 하나 푸는데 문제가 요구하는 시간이 필요, 같은문제 여러번도 가능

// problems[0] = 문제 푸는데 필요한 알고력
// problems[1] = 문제 푸는데 필요한 코딩력
// problems[2] = 문제 풀때 증가하는 알고력
// problems[3] = 문제 풀때 증가하는 코딩력
// problems[4] = 문제를 푸는데 드는 시간

// 구해야 하는거? -> 모든 문제를 풀수있는 알고력, 코딩력을 얻는 최단시간

// 현재 풀수있는 문제를 구함
//  있을경우:
//  없을경우: 해당 문제를 풀기위한 능력

// 다음문제를 풀기위해 필요한 시간?
// 풀수있는 문제를 풀어서 능력을 얻는데 걸리는 시간, 공부해서 능력을 얻는 시간 비교

// 다음 문제를 풀기위해 충분한 능력이 있는가?
// yes -> 다음문제를 푼다
// no -> 능력을 기른다.

// 우선순위큐 4개, 큐 종류는 최소힙
// 못풋문제의 알고력, 코딩력
// 푼문제의  알고력, 코딩력

const alp = [10, 0];
const cop = [10, 0];
const problems = [
  [
    [10, 15, 2, 1, 2],
    [20, 20, 3, 3, 4],
  ],
  [
    [0, 0, 2, 1, 2],
    [4, 5, 3, 1, 2],
    [4, 11, 4, 0, 2],
    [10, 4, 0, 4, 2],
  ],
];

for (let i = 0; i < 2; i++) {
  const result = solution(alp[i], cop[i], problems[i]);
  console.log(result);
}
