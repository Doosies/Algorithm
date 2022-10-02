function solution(n, m, x, y, r, c, k) {
  const board = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => ".")
  );
  board[x - 1][y - 1] = "S";
  board[r - 1][c - 1] = "E";
  const posChar = ["d", "u", "l", "r"];
  const pos = [
    //[y,x]
    // down
    [1, 0],
    // up
    [-1, 0],
    // left
    [0, -1],
    // right
    [0, 1],
  ];
  let result = [];
  const memo = {};

  const recur = (count, y, x, dir) => {
    if (count === k) {
      if (board[y][x] === "E") {
        result.push(dir.join(""));
      }
      return;
    }
    //   pos.forEach(([dy, dx], i) => {
    //     const ny = y + dy;
    //     const nx = x + dx;
    //     if (ny >= 0 && ny < n && x >= 0 && nx < m) {
    //       recur(count + 1, ny, nx, [...dir, posChar[i]]);
    //     }
    //   });
    // };
    pos.forEach(([dy, dx], i) => {
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < n && x >= 0 && nx < m) {
        const nextCount = count + 1;
        const key = `${ny}${nx}${dir}`;
        if (!memo[key]) {
          memo[key] = true;
          recur(nextCount, ny, nx, [...dir, posChar[i]]);
        }
      }
    });
  };

  recur(0, x - 1, y - 1, []);
  // console.log(result);
  return result.sort()[0] ?? "impossible";
}

const aa = solution(3, 4, 2, 3, 3, 1, 5);
console.log(aa);
