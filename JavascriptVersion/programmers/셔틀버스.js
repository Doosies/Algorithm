function strToTime(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function addZero(str) {
  return `0${str}`;
}

function timeToStr(time) {
  let hh = Math.floor(time / 60).toString();
  let mm = (time - hh * 60).toString();
  if (hh.length === 1) hh = addZero(hh);
  if (mm.length === 1) mm = addZero(mm);
  return [hh, mm].join(':');
}

function solution(n, t, m, timetable) {
  let nowTime = strToTime('09:00');
  let myTime = strToTime('09:00') + (n - 1) * t;

  timetable = timetable.map(time => strToTime(time)).sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    let inPeople = 0;
    let bigTime = 0;
    for (let j = 0; j < m; j++) {
      if (timetable?.[0] <= nowTime) {
        const nowTime = timetable.shift();
        bigTime = Math.max(bigTime, nowTime);
        inPeople++;
      }
      if (i === n - 1 && j === m - 1 && inPeople >= m) {
        myTime = bigTime - 1;
      }
    }
    nowTime += t;
  }

  return timeToStr(myTime);
}
