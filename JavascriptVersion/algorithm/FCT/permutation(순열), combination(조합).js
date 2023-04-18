const ans = [];
const end = 3;

const getPermutation = (visited = new Set(), permu = []) => {
  if (permu.length === end) {
    ans.push([...permu]);
    return;
  }
  for (let i = 0; i < end; i++) {
    if (visited.has(i)) continue;
    visited.add(i);
    getPermutation(visited, [...permu, i]);
    visited.delete(i);
  }
};

const getCombination = (now = 0, combi = []) => {
  if (combi.length === 3) {
    ans.push([...combi]);
    return;
  }
  for (let i = now; i < 4; i++) {
    getCombination(i + 1, [...combi, i]);
  }
};

getCombination();
console.log(ans);
