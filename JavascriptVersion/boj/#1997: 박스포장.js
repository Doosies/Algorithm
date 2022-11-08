const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync(0, 'utf-8')
    : `
3 5 12
6
X....
X....
X....
X....
X....
XXXXX
4
XXX..
..X..
..XXX
..X..
5
XXXXX
.XXXX
..XXX
...XX
....X
`
)
  .trim()
  .split('\n');
const input = (() => {
  let line = 0;
  return type =>
    type === 'num'
      ? stdin[line++].split(' ').map(v => +v)
      : stdin[line++].split('');
})();

const solution = () => {
  // n, w, b: 장식판 종류, 장식판과 박스 너비, 박스 높이
  const [n, w, b] = input('num');
  const boards = [];
  const result = [];
  let box = Array.from({ length: b }, () =>
    Array.from({ length: w }, () => '.'),
  );

  for (let i = 0; i < n; i++) {
    const height = +input().join('');
    const board = Array.from({ length: height }, () =>
      input('str').map((v, i) => (v === 'X' ? i : v)),
    );
    boards.push(board);
  }

  const getBoxTop = () => {
    for (let i = 0; i < box.length; i++) {
      // 전부 .으로 채워져 있지 않으면 뭔가 있음.
      if (!box[i].every(v => v === '.')) {
        return i;
      }
    }
    // 아무것도 없음
    return box.length;
  };

  const isCrash = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== '.' && arr2[i] !== '.') return true;
    }
    return false;
  };
  const mergeArr = (arr1, arr2) => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== '.') {
        result.push(arr1[i]);
      } else if (arr2[i] !== '.') {
        result.push(arr2[i]);
      } else {
        result.push('.');
      }
    }
    return result;
  };
  const divArr = (origin, moved) => {
    const result = [];
    for (let i = 0; i < origin.length; i++) {
      if (origin[i] !== moved[i]) {
        result.push(origin[i]);
      } else {
        result.push('.');
      }
    }
    return result;
  };
  const pushBoard = board => {
    for (let i = board.length - 1; i >= 0; i--) {
      if (isCrash(box[i], board[i])) return false;
      box[i] = [...board[i]];
    }
    return true;
  };
  // 충돌나지 않았을때 top까지 한칸씩 아래로 내림
  const moveDown = board => {
    for (let i = 0; i < box.length - board.length; i++) {
      const beforeState = [...box];
      for (let j = board.length - 1; j >= 0; j--) {
        const bottom = i + j + 1;
        const now = i + j;
        // 충돌날경우 그만 내림
        if (isCrash(box[bottom], board[j])) {
          box = [...beforeState];
          return;
        }
        box[bottom] = [...mergeArr(box[bottom], box[now])];
        box[now] = [...divArr(box[now], board[j])];
      }
    }
  };

  boards.forEach(board => {
    // 맨 윗부분에 넣을수 있는지 확인

    const heightMargin = getBoxTop();
    // // 못넣으면
    // if (heightMargin < board.length) {
    // }
    // 넣을수 있으면
    const canPushBoard = pushBoard(board);
    // 못넣으면
    if (!canPushBoard) {
      result.push(box.length - heightMargin);
      box = Array.from({ length: b }, () =>
        Array.from({ length: w }, () => '.'),
      );
      pushBoard(board);
    }
    moveDown(board);
  });
  result.push(box.length - getBoxTop());

  console.log(result.join(' '));
};
for (let i = 0; i < 1; i++) {
  solution();
}

// box 0, board 아래
// box 0, board 아래 : box 1 보드 아래 -1

// 충돌되면 -> 현재 윗부분의 높이-1이 잔여높이보다 많이 남았다면 높이 -1 ~ 나머지를 박스에 넣음
//        -> 잔여높이보다 높이 남지 않았다면 현재 box높이를 result에 넣고 box를 초기화시키고 그 바닥에 board를 깔음
// 충돌안나면 -> 진행

// 11중에 1까지 차있다면 =  12칸이 있는데 11칸이 차이음 = length - getBoxTop()
//
// 11 - 3 - 1
