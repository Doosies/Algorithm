// BOOL 1, SHORT 2, FLOAT 4, INT 8, LONG 16
// SHORT, FLOAT이 연속될 경우 사이에 패딩을 붙여야 함.
// SHORT는 2배수, FLOAT은 4배수가 되도록 메모리를 할당해야함.
// BOOL 뒤에 BOOL은 패딩없이 붙음.
// BOOL 뒤에 SHORT, FLOAT을 붙이려면 사이에 패딩을 붙여야함.
// SHORT뒤에 FLOAT, FLOAT뒤에 SHORT는 사이에 패딩 안붙음
// SHORT, FLOAT 뒤에 BOOL도 사이에 패딩없음

// BOOL은 현재 8비트중 자리 있으면 넣음
// SHORT는 8비트에 0, 2, 4, 6 자리에만 들어감
// FLOAT은 8비트에 0, 4 자리에만 들어감.
// INT는 8비트 한개
// LONG은 8비트 두개
function change(str, start, end) {
  const front = str.substring(0, start);
  const middle = '#'.repeat(end - start);
  const last = str.substring(end);
  return `${front}${middle}${last}`;
}

function addPadding(pos, div) {
  while (pos % div !== 0) {
    pos += 1;
  }
  return pos;
}
// 메모리 할당
function allocation(memory, buffer) {
  const memory8 = '########';
  if (buffer.length > 8) memory.push(memory8, memory8);
  else memory.push(buffer);
}

function sol(input) {
  // 0 = memory 사용량
  // 1 = 최대 메모리 ( 벗어나면 다음 메모리 사용)
  const stoi = {
    BOOL: [1, 7],
    SHORT: [2, 6],
    FLOAT: [4, 4],
    INT: [8, 0],
    LONG: [16, 0],
  };
  const memoryTot = [];
  let memoryBuffer = '........';
  let nowPos = 0;

  for (const what of input) {
    if (memoryTot.length >= 16) return 'HALT';
    const [memory, max] = stoi[what];

    if (nowPos > max) {
      allocation(memoryTot, memoryBuffer);
      if (nowPos === 8) memoryBuffer = '........';
      nowPos = 0;
    }

    nowPos = addPadding(nowPos, memory);
    memoryBuffer = change(memoryBuffer, nowPos, (nowPos += memory));
  }
  if (nowPos > 0) allocation(memoryTot, memoryBuffer);

  return memoryTot;
}

// console.log(sol(['INT', 'INT', 'BOOL', 'SHORT', 'LONG']));
// console.log(sol(['INT', 'SHORT', 'FLOAT', 'INT', 'BOOL']));
// console.log(sol(['FLOAT', 'SHORT', 'BOOL', 'BOOL', 'BOOL', 'INT']));
// console.log(
//   sol(['BOOL', 'LONG', 'SHORT', 'LONG', 'BOOL', 'LONG', 'BOOL', 'LONG', 'SHORT', 'LONG', 'LONG']),
// );

console.log(sol(['SHORT', 'SHORT', 'SHORT', 'SHORT', 'SHORT']));
