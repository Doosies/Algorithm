function solution(m, musicinfos) {
  let answer = '';

  musicinfos = musicinfos.map(musicInfo => {
    const musicInfoArr = musicInfo.split(',');
    const playTime =
      (new Date(`1970-01-01 ${musicInfoArr[1]}:00`) - new Date(`1970-01-01 ${musicInfoArr[0]}:00`)) / 60000;
    // A#같이 뒤에 #들어간거는 소문자a로 변경해줌
    let melody = musicInfoArr[3].replace(/[A-Z]#/g, s => s[0].toLowerCase());
    // melody를 재생시간만큼 반복후, 재생시간만큼 잘라줌
    melody = melody.repeat(Math.ceil(playTime / melody.length)).substr(0, playTime);
    // 재생시간, 노래제목, 수정된 멜로디를 반환함.
    return `${playTime},${musicInfoArr[2]},${melody}`;
  });

  // 재생시간이 긴것이 앞으로 정렬함.
  musicinfos.sort((a, b) => {
    b.split(',')[0] - a.split(',')[0];
  });
  // m에서 #이 들어간걸 소문자로 변경후 정렬된 musicinfos를 돌며 일치하는 것들만 찾음.
  answer = musicinfos.filter(e => e.split(',')[2].indexOf(m.replace(/[A-Z]#/g, m => m[0].toLowerCase())) != -1);
  return answer.length == 0 ? '(None)' : answer[0].split(',')[1];
}


const inputs = [
  ['ABCDEFG', ['12:02,12:16,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF', '12:01,12:15,TEST,ABCDEFG']],
  ['CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']],
  ['ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']],
];

for (let i = 0; i < 3; i++) {
  console.log(solution(inputs[i][0], inputs[i][1]));
}

// const a = '123142141';
// console.log(a.indexOf('2315'));
