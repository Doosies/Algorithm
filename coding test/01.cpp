#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

using namespace std;

bool isSameWeight(vector<int> arr) {
  int right = arr.size() / 2;
  int rightSum;
  int leftSum = accumulate(arr.begin(), arr.begin() + right, 0);

  if (arr.size() % 2 == 0)
    rightSum = accumulate(arr.begin() + right, arr.end(), 0);
  else
    rightSum = accumulate(arr.begin() + right + 1, arr.end(), 0);

  return leftSum == rightSum ? true : false;
}
vector<int> solution(vector<int> marbles) {
  vector<vector<int>> sameWeight;
  vector<int> answer;

  int maxWeight = 0;
  int maxLength = 0;

  sort(marbles.begin(), marbles.end());

  for (int i = 0; i < marbles.size(); i++) {
    for (int j = i; j <= marbles.size(); j++) {
      vector<int> n(marbles.begin() + i, marbles.begin() + j);
      do {
        if (isSameWeight(n))
          sameWeight.push_back(n);
      } while (next_permutation(n.begin(), n.end()));
    }
  }
  for (auto now : sameWeight) {
    int weight = accumulate(now.begin(), now.end(), 0);
    int length = now.size();

    if (maxLength < length || maxWeight < weight) {
      answer = now;
      maxWeight = weight;
      maxLength = length;
    }
  }
  return answer;
}

int main() {
  vector<int> input = {3, 9, 7, 5};
  vector<int> answer = solution(input);
  for (auto a : answer) {
    cout << a << " ";
  }
  return 0;
}