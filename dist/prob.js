"use strict";
//init용
const stdin = (process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
16
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
`).trim().split('\n');
const input = (() => {
    let line = 0;
    return () => stdin[line++].split("").map(v => +v);
})();
const N = +input();
const arr = Array.from({ length: N }, () => input());
function isAllSame(row, col, size) {
    for (let i = row; i < row + size; i++) {
        for (let j = col; j < col + size; j++) {
            if (arr[i][j] !== arr[row][col]) {
                return false;
            }
        }
    }
    return true;
}
function compress(row, col, size) {
    const firstNum = arr[row][col];
    if (size === 1 || isAllSame(row, col, size)) {
        return `${firstNum}`;
    }
    else {
        const s = size / 2;
        return ("(" +
            compress(row, col, s) +
            compress(row, col + s, s) +
            compress(row + s, col, s) +
            compress(row + s, col + s, s) +
            ")");
    }
}
const rst = compress(0, 0, N);
console.log(rst);
//# sourceMappingURL=prob.js.map