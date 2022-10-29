// 기본시간이하: 기본요금
// 기본시간초과: 단위시간마다 단위요금 청구
// - 맞아떨어지지 않는다면 올림

// fees[0] = 기본시간 , 1 <= f0 <= 1439
// fees[1] = 기본요금, 0 <= f1 <= 100,000
// fees[2] = 단위시간(분), 1 <= f2 <= 1439
// fees[3] = 단위요금(원), 1 <= f3 <= 10,000

// 시각 차량번호 내역
// :시각
// HH:MM -> 00:00 ~ 23:59까지
// :차량번호
// 0~9로 이뤄진 길이4의 문자열
// :내역
// IN or OUT
// records는 시각 기준으로 오름차순
function solution(fees, records) {
  const [defaultTime, defaultFee, pointTime, pointFee] = fees;

  const inHistory = {};
  const carsTotalLeave = {};
  const result = [];

  // 차량들이 주차장에 있던 시간 구함
  records.forEach(record => {
    const [time, carNum, _] = record.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    const timeVal = hour * 60 + minute + 60;

    if (inHistory[carNum]) {
      // 기록이 존재한다면 값만 더해줌
      if (carsTotalLeave[carNum]) {
        carsTotalLeave[carNum] += timeVal - inHistory[carNum];
      } else {
        carsTotalLeave[carNum] = timeVal - inHistory[carNum];
      }
      delete inHistory[carNum];
    } else {
      inHistory[carNum] = timeVal;
    }
  });

  // 주차장에 차가 남아있다면 다 내보냄
  Object.entries(inHistory).map(([carNum, timeVal]) => {
    if (carsTotalLeave[carNum]) {
      carsTotalLeave[carNum] += 1499 - timeVal;
    } else {
      carsTotalLeave[carNum] = 1499 - timeVal;
    }
  });

  // 차의 있던 시간만 오름차순으로 넣어둠
  const carStayedTimeLists = Object.entries(carsTotalLeave)
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(v => v[1]);

  carStayedTimeLists.forEach(stayedTime => {
    let totalFee = defaultFee;
    stayedTime -= defaultTime;

    if (stayedTime > 0) {
      totalFee += Math.ceil(stayedTime / pointTime) * pointFee;
    }
    result.push(totalFee);
  });

  return result;
}

// console.log(
//   solution(
//     [180, 5000, 10, 600],
//     [
//       '05:34 5961 IN',
//       '06:00 0000 IN',
//       '06:34 0000 OUT',
//       '07:59 5961 OUT',
//       '07:59 0148 IN',
//       '18:59 0000 IN',
//       '19:09 0148 OUT',
//       '22:59 5961 IN',
//       '23:00 5961 OUT',
//     ],
//   ),
// );

// console.log(
//   solution(
//     [120, 0, 60, 591],
//     [
//       '16:00 3961 IN',
//       '16:00 0202 IN',
//       '18:00 3961 OUT',
//       '18:00 0202 OUT',
//       '23:58 3961 IN',
//     ],
//   ),
// );

// console.log(solution([1, 461, 1, 10], ['00:00 1234 IN']));

console.log(solution([20, 1000, 10, 500], ['00:00 3961 IN', '00:01 3961 OUT']));
