function solution(new_id) {
  let result = new_id
    .toLowerCase()
    .replace(/[^a-z | 0-9| \-| \_| \.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .slice(0, 15)
    .replace(/^\.|\.$/g, '');

  if (result.length <= 2) {
    if (result.length === 0) result = 'a';
    result += result.at(-1).repeat(3 - result.length);
  }
  return result;
}

console.log(solution('...!@BaT#*..y.abcdefghijklm'));
console.log(solution('z-+.^.'));
console.log(solution('=.='));
console.log(solution('123_.def'));
console.log(solution('abcdefghijklmn.p'));
