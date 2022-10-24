function solution(s) {
  const stack = [];
  s = s.split('');

  for (let i = 0; i < s.length; i++) {
    if (stack.at(-1) === s[i]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length > 0 ? 0 : 1;
}
console.log(solution('ab'));

//1. 재귀로 풀어봄
//2. while로 풀음
//3. 스택으로 완성
