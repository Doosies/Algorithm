// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/17676
// 시작날짜: 2023.06.29
// 시작시간: 16:13
// 종료시간: 22:39
// 소요시간: 06:26

function getTime(log, starts, ends) {
  let [_, time, T] = log.split(' ');
  let [hh, mm, sec] = time.split(':');
  let [ss, sss] = sec.split('.');

  hh = +hh * 1000 * 60 * 60;
  mm = +mm * 1000 * 60;
  ss = +ss * 1000;
  sss = +sss;

  let [s, ms] = T.slice(0, -1).split('.');
  s = +s * 1000;
  ms = ms?.padEnd(3, '0') | 0;
  T = s + ms;

  const end = hh + mm + ss + sss;
  const start = end - T + 1;

  starts.push(start);
  ends.push(start + 1000);
  return [start, end];
}
function solution(lines) {
  const starts = [];
  const ends = [];
  let max = 1;

  lines = lines.map(line => getTime(line, starts, ends));
  starts.sort((a, b) => a - b);

  // for (let i = 0; i < lines.length; i++) {
  //   let cnt = 1;
  //   for (let j = i + 1; j < lines.length; j++) {
  //     if (lines[i][1] + 1000 > lines[j][0]) {
  //       cnt++;
  //     }
  //   }
  //   max = Math.max(max, cnt);
  // }
  let left = 0;
  let right = 0;
  let cnt = 1;
  // let max = 0;
  const n = lines.length;

  while (left < n && right < n) {
    if (ends[left] <= starts[right] || starts[left] + 1000 > ends[right]) {
      max = Math.max(max, cnt);
      left++;
      cnt++;
    } else {
      right++;
      cnt--;
    }
  }

  return max;
}

console.log(solution(['2016-09-15 01:00:04.001 2.0s', '2016-09-15 01:00:07.000 2s']));
console.log(solution(['2016-09-15 01:00:04.002 2.0s', '2016-09-15 01:00:07.000 2s']));
console.log(
  solution([
    '2016-09-15 20:59:57.421 0.351s',
    '2016-09-15 20:59:58.233 1.181s',
    '2016-09-15 20:59:58.299 0.8s',
    '2016-09-15 20:59:58.688 1.041s',
    '2016-09-15 20:59:59.591 1.412s',
    '2016-09-15 21:00:00.464 1.466s',
    '2016-09-15 21:00:00.741 1.581s',
    '2016-09-15 21:00:00.748 2.31s',
    '2016-09-15 21:00:00.966 0.381s',
    '2016-09-15 21:00:02.066 2.62s',
  ]),
);
