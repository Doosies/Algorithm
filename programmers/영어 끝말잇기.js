function solution(n, words) {
  const said = { [words[0]]: true };
  let nowOrder = 1;

  for (let i = 1; i < words.length; i++) {
    nowOrder++;
    if (words[i - 1].at(-1) !== words[i][0] || said[words[i]]) {
      const peopleNum = nowOrder % n;
      return [peopleNum === 0 ? n : peopleNum, Math.ceil(nowOrder / n)];
    }
    said[words[i]] = true;
  }
  return [0, 0];
}

console.log(
  solution(3, [
    'tank',
    'kick',
    'know',
    'wheel',
    'land',
    'dream',
    'mother',
    'robot',
    'tank',
  ]),
);
