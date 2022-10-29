function getStr(str) {
  const arr = [];
  const reg = /[A-Z]/;
  for (let i = 0; i < str.length - 1; i++) {
    const left = reg.test(str[i]);
    const right = reg.test(str[i + 1]);

    if (left && right) {
      arr.push([str[i], str[i + 1]].join(''));
    }
  }
  return arr;
}
const getIntersection = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      const idx = arr2.indexOf(arr1[i]);
      result.push(arr2[idx]);
      arr2.splice(idx, 1);
    }
  }
  return result.length;
};

function solution(str1, str2) {
  const arr1 = getStr(str1.toUpperCase());
  const arr2 = getStr(str2.toUpperCase());

  let intersection = getIntersection([...arr1], [...arr2]);
  let union = arr1.length + arr2.length - intersection;

  const result = Math.floor((intersection / union) * 65536);
  if (union === 0) return 65536;
  if (intersection === 0) return 0;
  return result;
}
