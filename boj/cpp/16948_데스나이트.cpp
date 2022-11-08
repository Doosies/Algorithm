// #include <algorithm>
#include <iostream>
#include <queue>
// #include <string>
#include <tuple>
// #include <unordered_map>
// #include <utility>
using namespace std;

bool canMove(int y, int x, int N) {
  if (y >= 0 && y < N && x >= 0 && x < N) {
    return true;
  }
  return false;
}
int main() {
  freopen("input.txt", "r", stdin);
  int N, sy, sx, ey, ex;
  cin >> N >> sy >> sx >> ey >> ex;
  vector<pair<int, int>> nextMove = {{-2, -1}, {-2, 1}, {0, -2},
                                     {0, 2},   {2, -1}, {2, 1}};

  queue<tuple<int, int, int>> q;
  vector<vector<bool>> visited;
  visited.assign(N, vector<bool>(N, false));
  // q.push(make_tuple(sy, sx, 0));
  while (!q.empty()) {
    // 0: y, 1: x, 2: moved
    tuple<int, int, int> cur = q.front();
    q.pop();

    if (get<0>(cur) == ey && get<1>(cur) == ex) {
      cout << get<2>(cur);
      break;
    }

    for (auto next : nextMove) {
      int py = next.first + get<0>(cur);
      int px = next.second + get<1>(cur);

      if (!canMove(get<0>(cur), get<1>(cur), N))
        continue;
      if (visited[py][px])
        continue;

      visited[py][px] = true;
      q.push(make_tuple(py, px, get<2>(cur) + 1));
    }
  }

  cout << -1;
  return 0;
}
