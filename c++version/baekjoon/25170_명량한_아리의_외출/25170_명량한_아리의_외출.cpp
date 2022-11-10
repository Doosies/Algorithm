#include <iostream>
using namespace std;

int R, C, T;
int works[50][50];
int times[50][50];
int dp[50][50][501];

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);

  cin >> R >> C >> T;
  for (int r = 0; r < R; r++) {
    for (int c = 0; c < C; c++) {
      cin >> works[r][c];
    }
  }
  for (int r = 0; r < R; r++) {
    for (int c = 0; c < C; c++) {
      cin >> times[r][c];
    }
  }

  dp[0][0][0] = 1;
  for (int r = 0; r < R; r++) {
    for (int c = 0; c < C; c++) {
      for (int t = 1; t <= T; t++) {
        int &cur = dp[r][c][t];
        if (r > 0) {
          if (dp[r - 1][c][t - 1])
            cur = max(cur, dp[r - 1][c][t - 1]);
          if (t >= (times[r - 1][c] + 1)) {
            if (dp[r - 1][c][t - (times[r - 1][c] + 1)])
              cur = max(cur, dp[r - 1][c][t - (times[r - 1][c] + 1)] +
                                 works[r - 1][c]);
          }
        }
        if (c > 0) {
          if (dp[r][c - 1][t - 1])
            cur = max(cur, dp[r][c - 1][t - 1]);
          if (t >= (times[r][c - 1] + 1)) {
            if (dp[r][c - 1][t - (times[r][c - 1] + 1)])
              cur = max(cur, dp[r][c - 1][t - (times[r][c - 1] + 1)] +
                                 works[r][c - 1]);
          }
        }
        if (r > 0 && c > 0) {
          if (dp[r - 1][c - 1][t - 1])
            cur = max(cur, dp[r - 1][c - 1][t - 1]);
          if (t >= (times[r - 1][c - 1] + 1)) {
            if (dp[r - 1][c - 1][t - (times[r - 1][c - 1] + 1)])
              cur = max(cur, dp[r - 1][c - 1][t - (times[r - 1][c - 1] + 1)] +
                                 works[r - 1][c - 1]);
          }
        }
      }
    }
  }

  int ans = 0;
  for (int t = 0; t <= T; t++)
    ans = max(ans, dp[R - 1][C - 1][t]);

  cout << ans - 1;
}