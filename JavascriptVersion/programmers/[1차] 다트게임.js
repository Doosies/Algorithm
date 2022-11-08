function solution(dartResult) {
  const result = [];
  const dartStr = [];

  for (let i = 0; i < dartResult.length; i++) {
    const str = dartResult[i];
    const last = result.length - 1;

    if (+str >= 0 && +str <= 10) {
      if (+dartResult[i - 1] === 1) {
        result[last] = [10, ''];
      } else {
        result.push([+str, '']);
      }
      continue;
    }

    if (str === 'D') {
      result[last][0] = result[last][0] ** 2;
    }
    if (str === 'T') {
      result[last][0] = result[last][0] ** 3;
    }

    if (str === '*') {
      if (result[last][1] !== '#') {
        result[last] = [result[last][0] * 2, '*'];
      }
      if (last - 1 >= 0) {
        result[last - 1][0] = result[last - 1][0] * 2;
      }
    }
    if (str === '#' && result[last][1] !== '*') {
      result[last] = [result[last][0] * -1, '#'];
    }
  }

  // console.log(result);
  return result.reduce((sum, now) => sum + now[0], 0);
}

console.log(solution('1D#2S*3S'));
// 기회는 3번
// 얻을수 있는 점수 = 0 ~ 10
// S=1제곱, D=2제곱, T=3제곱
// *= 바로 전에 얻은 점수 각 2배, #= 현재 점수 마이너스
// * = 첫번쨰 기회에서 가능, 첫번째만 2배
// * = 다른 *와 중첩 가능
// * = #와 중첩 가능
// S, D, T는 점수마다 하나씩 무조건 존재
// *, #은 둘중 하나만 존재할수도, 존재하지 않을수도 있다.

// 1S: 2( 1*2: 다음의 *때문에)
// 2D:*: 2*2=4,
// 3T: 3*3*3 = 27
