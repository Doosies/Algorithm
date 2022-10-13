/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  const obj = {};
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    if (obj[s[i]]) {
      delete obj[s[i]];
      result++;
    } else {
      obj[s[i]] = true;
    }
  }
  return result * 2 + (Object.keys(obj).length > 0 ? 1 : 0);
};

console.log(longestPalindrome("aa"));
