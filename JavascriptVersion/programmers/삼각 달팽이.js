const solution = n => {
  const answer = Array.from({ length: n }, (_, i) => Array(1).fill(i + 1));
  const pos = [
    [0, 1],
    [-1, -1],
    [1, 0],
  ];
  let x = 0;
  let y = n - 1;
  let now = n;
  let move = n - 1;

  for (let i = 0; i < n; i++) {
    const [ny, nx] = pos[i % 3];
    for (let j = 0; j < move; j++) {
      y += ny;
      x += nx;
      now++;
      answer[y][x] = now;
    }
    move--;
  }
  return answer.flat();
};

console.log(solution(5));
