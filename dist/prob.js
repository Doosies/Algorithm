"use strict";
///////////////////////////////////////////////////////여기까지 힙 구현부
//init용
const stdin = (process.platform === 'linux'
    ? require('fs').readFileSync(0, 'utf-8')
    : `
0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0
`).trim().split('\n');
const input = (() => {
    let line = 0;
    return () => stdin[line++].split(" ").map(Number);
})();
const board = Array.from({ length: 9 }, () => input());
let cnt = 0;
let returnFlag = false;
const getNumsHorizontal = (y) => {
    const inNum = [];
    for (let i = 1; i < 10; i++) {
        if (!board[y].includes(i)) {
            inNum.push(i);
        }
    }
    return inNum;
};
const getNumsVertical = (x) => {
    const inNum = [];
    const verticalBoard = Array.from({ length: 9 }, (_, i) => board[i][x]);
    for (let i = 1; i < 10; i++) {
        if (!verticalBoard.includes(i)) {
            inNum.push(i);
        }
    }
    return inNum;
};
const getNumsSquare = (startX, startY) => {
    const inNum = [];
    const squareBoard = [];
    for (let y = startY; y < startY + 3; y++) {
        for (let x = startX; x < startX + 3; x++) {
            squareBoard.push(board[y][x]);
        }
    }
    for (let i = 1; i < 10; i++) {
        if (!squareBoard.includes(i)) {
            inNum.push(i);
        }
    }
    return inNum;
};
const getNeedNum = (y, x) => {
    if (board[y][x] !== 0) {
        return [];
    }
    const startX = Math.floor(x / 3) * 3; // 0 ~ 2;
    const startY = Math.floor(y / 3) * 3; // 0 ~ 2;
    const needNumVertical = getNumsVertical(x);
    const needNumHorizontal = getNumsHorizontal(y);
    const needSquare = getNumsSquare(startX, startY);
    const needNum = [...needNumVertical, ...needNumHorizontal, ...needSquare];
    const needNumCnt = Object.assign({}, Array(10).fill(0));
    needNum.forEach(v => {
        // console.log(v);
        needNumCnt[v]++;
    });
    const objArr = Object.entries(needNumCnt);
    return objArr.filter(v => v[1] === 3).map(v => +v[0]);
};
const find = (x, y) => {
    if (x === 9) {
        x = 0;
        y += 1;
    }
    if (y === 9 || returnFlag) {
        returnFlag = true;
        return;
    }
    for (let i = x; i < 9; i++) {
        const possibleNumbers = getNeedNum(y, i);
        const numBeforeChange = board[y][x];
        // 현재 자리에 놓을 수 있는 숫자들.
        for (let j = 0; j < possibleNumbers.length; j++) {
            const putNum = possibleNumbers[j];
            board[y][x] = putNum;
            find(i + 1, y);
            if (returnFlag) {
                return;
            }
            board[y][x] = numBeforeChange;
        }
        if (board[y][x] === 0) {
            return;
        }
    }
};
find(0, 1);
board.forEach(v => {
    console.log(v.join(" "));
});
//# sourceMappingURL=prob.js.map