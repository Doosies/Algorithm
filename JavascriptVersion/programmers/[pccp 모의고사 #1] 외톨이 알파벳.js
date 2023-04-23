const solution = (inpStr = '') => {
  const map = new Map();
  let result = '';

  for (const str of inpStr) {
    map.set(str, (map.get(str) || 0) + 1);
  }

  for (const [str, cnt] of map) {
    if (cnt < 2) continue;
    if (inpStr.lastIndexOf(str) - inpStr.indexOf(str) < cnt) continue;
    result += str;
  }

  return result.split('').sort().join('') || 'N';
};

console.log(solution('edeaaabbccd'));
console.log(solution('eeddee'));
console.log(solution('string'));
console.log(solution('zbzbz'));
