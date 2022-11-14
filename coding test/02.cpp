#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int result = 0;
int getPower(int now, int limit, int k) {
  while (now >= limit) {
    now -= k;
    result++;
  }
  return now;
}
int dfs(int now, int power, int limits[6], int sockets[6][5], int k) {
  for (int i = 0; i < 5; i++) {
    if (sockets[now][i] == -1)
      power += k;
    else if (sockets[now][i] >= 2)
      power += dfs(sockets[now][i] - 1, 0, limits, sockets, k);
  }
  return getPower(power, limits[now], k);
}
int solution(int k, int limits[6], int sockets[6][5]) {
  dfs(0, 0, limits, sockets, k);
  return result;
}

int main() {
  int b[6] = {2000, 1000, 3000, 200, 600, 500};
  int c[6][5] = {{2, 3, -1, -1, -1}, {4, 0, -1, -1, 6},    {5, 0, 0, 0, 0},
                 {-1, 0, 0, 0, 0},   {-1, -1, -1, -1, -1}, {-1, -1, 0, 0, 0}};
  int a = solution(300, b, c);
  printf("%d", result);
}