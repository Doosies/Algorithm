// [](){}

function solution(s) {
  let stack = [s[0]];
  let result = 0;
  s = s.split('');

  const same = sign => {
    if (stack.at(-1) === sign) {
      stack.pop();
      return true;
    }
    return false;
  };
  const isCorrectParentheses = () => {
    let cnt = 0;
    stack = [s[0]];
    for (let i = 1; i < s.length; i++) {
      if (s[i] === ']') {
        same('[') ? cnt++ : stack.push(']');
      } else if (s[i] === ')') {
        same('(') ? cnt++ : stack.push(')');
      } else if (s[i] === '}') {
        same('{') ? cnt++ : stack.push('}');
      } else {
        stack.push(s[i]);
      }
    }
    return stack.length > 0 ? false : true;
  };

  for (let i = 0; i < s.length - 1; i++) {
    if (isCorrectParentheses()) result++;
    s = [...s.slice(1), s[0]];
  }
  return result;
}

console.log(solution('[](){}'));
