const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `4
1 900 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919
2 919 918 917 916 915 914 913 912 911 910 909 908 907 906 905 904 903 902 901 900
3 901 902 903 904 905 906 907 908 909 910 911 912 913 914 915 916 917 918 919 900
4 918 917 916 915 914 913 912 911 910 909 908 907 906 905 904 903 902 901 900 919`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(v => +v);
})();

const P = +input();
let result = '';
let moved = 0;

for (let c = 0; c < P; c++) {
  const [num, ...p] = input();

  moved = 0;
  for (let i = 0; i < 20; i++) {
    for (let j = i; j < 20; j++) {
      if (p[i] > p[j]) {
        [p[i], p[j]] = [p[j], p[i]];
        moved++;
      }
    }
  }
  result += `${num} ${moved}\n`;
}
console.log(result);
