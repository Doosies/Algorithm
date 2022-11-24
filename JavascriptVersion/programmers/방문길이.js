const solution = dirs => {
  let now = [0, 0];
  const directions = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0],
  };
  const visited = new Set();

  for (const next of dirs) {
    const [nextX, nextY] = directions[next];
    const [nowX, nowY] = now;
    const [plusX, plusY] = [nowX + nextX, nowY + nextY];
    if (plusX >= -5 && plusX <= 5 && plusY >= -5 && plusY <= 5) {
      const a = `(${plusX},${plusY})-(${nowX},${nowY})`;
      const b = `(${nowX},${nowY})-(${plusX},${plusY})`;
      visited.add(a);
      visited.add(b);
      now = [plusX, plusY];
    }
  }

  return visited.size / 2;
};

console.log(solution('ULURRDLLU'));
