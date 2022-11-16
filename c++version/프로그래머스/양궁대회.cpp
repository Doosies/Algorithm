#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>
using namespace std;

// 처음 파라메터로 들어오는 info
vector<int> globalInfo;
// 탐색하며 계속 변경되는 라이언이 화살 쏜 정보
vector<int> globalResult;
// 최종 결과
vector<vector<int>> result;
// 점수차 최대치
int maxDifference;

int getApeachScore() {
  int score = 0;
  for (int i = 0; i < 11; i++) {
    if (globalInfo[i] != 0 && globalResult[i] == 0) {
      score += 10 - i;
    }
  }
  return score;
}
//
// vector<int> getOrderMoreHitSmallScore(vector<int> tmpResult) {
//   for (int i = 10; i >= 0; i--) {
//     if (result[i] > tmpResult[i]) {
//       return result;
//     } else {
//       return tmpResult;
//     }
//   }
//   return tmpResult;
// }
void dfs(int now, int leftArrow, int nowScore) {
  // 끝까지 탐색했다면?
  if (now == 11) {
    int lion = nowScore;
    int apeach = getApeachScore();
    int difference = lion - apeach;
    vector<int> tmpResult = globalResult;

    // 남은화살 처리
    if (leftArrow > 0) {
      tmpResult[10] = leftArrow;
    }
    // 점수차가 제일 많이나는거 초과라면 그냥 넣어줌
    if (difference > maxDifference) {
      maxDifference = difference;
      result = vector(1, tmpResult);
    }
    // 만약 두개가 같다면 뒤에 더 많이 맞춘거 넣어줌
    else if (difference == maxDifference) {
      result.push_back(tmpResult);
    }
  }

  for (int i = now; i < 11; i++) {
    int score = 10 - i;
    // 라이언이 과녁을 쏠 수 있을 경우
    if (globalInfo[i] < leftArrow) {
      int tmp = globalResult[i];
      globalResult[i] = globalInfo[i] + 1;
      dfs(i + 1, leftArrow - globalInfo[i] - 1, nowScore + score);
      globalResult[i] = tmp;

      dfs(i + 1, leftArrow - globalInfo[i] - 1, nowScore);

    }
    // 쏠수 없는경우
    else {
      dfs(i + 1, leftArrow, nowScore);
    }
  }
}
vector<int> solution(int n, vector<int> info) {
  globalInfo = info;
  globalResult = vector(11, 0);
  result.clear();

  maxDifference = 0;

  for (int i = 0; i < 11; i++) {
    dfs(i, n, 0);
  }

  int size = result.size();
  cout << "----------------------------------------" << endl;
  if (size > 0) {
    for (int i = 0; i < size; i++) {
      reverse(result[i].begin(), result[i].end());
      // for (auto a : result[i]) {
      //   cout << a << " ";
      // }
      // cout << endl;
    }
    stable_sort(result.begin(), result.end(),
                [](vector<int> a, vector<int> b) -> bool {
                  for (int i = 10; i >= 0; i++) {
                    if (a[i] >= b[i])
                      return true;
                  }
                  return false;
                });
    reverse(result[0].begin(), result[0].end());
  }

  return maxDifference == 0 ? vector(1, -1) : result[0];
  // return vector(1, 0);
}

int main() {
  freopen("/Users/songminhyeong/Git/Study/algorithm/c++version/프로그래머스/"
          "input.txt",
          "r", stdin);

  for (int i = 0; i < 4; i++) {
    int n;
    vector<int> result;
    vector<int> info(11, 0);

    cin >> n;
    for (int i = 0; i < 11; i++) {
      cin >> info[i];
    }

    result = solution(n, info);

    for (int a : result) {
      std::cout << a << " ";
    }
    cout << endl;
  }
}

// // 현재 점수차 == 최대 점수차 {
// //
// // }

// // 어피치가 10점, 라이언이 20점
// // 어피치가 0, 라이언 10점
