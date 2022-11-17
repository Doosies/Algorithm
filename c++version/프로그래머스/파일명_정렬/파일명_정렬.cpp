#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

using namespace std;
typedef pair<string, int> headnumber;

bool isNumber(char ch) {
  return (ch >= 97 && ch <= 122) || (ch == 32 || ch == 45 || ch == 46) ? false
                                                                       : true;
}
// 공백: 32, 마침표: 46, 빼기: 45
headnumber getHeadNumberTail(string str) {
  string head;
  string number;
  for (int i = 0; i < str.length(); i++) {
    if (str[i] >= 65 && str[i] <= 90)
      str[i] += 32;
    // 숫자라면
    if (isNumber(str[i]))
      number.append(str.substr(i, 1));

    // 문자인데 숫자가 차있으면
    else if (number.length() > 0)
      break;

    // 문자이고 숫자가 차있지 않으면
    else
      head.append(str.substr(i, 1));
  }
  return make_pair(head, stoi(number));
}

vector<string> solution(vector<string> files) {
  vector<pair<string, headnumber>> rstPair;
  vector<string> result;

  for (auto &file : files)
    rstPair.push_back(make_pair(file, getHeadNumberTail(file)));

  stable_sort(rstPair.begin(), rstPair.end(), [](auto a, auto b) {
    auto [head1, number1] = get<1>(a);
    auto [head2, number2] = get<1>(b);

    if (head1 != head2)
      return head1 < head2;
    if (number1 != number2)
      return number1 < number2;

    return false;
  });

  result = accumulate(rstPair.begin(), rstPair.end(), vector<string>{},
                      [](auto acc, auto now) {
                        acc.push_back(get<0>(now));
                        return acc;
                      });
  return result;
}

int main() {
  vector<vector<string>> filesList = {{"img12.png", "img10.png", "img02.png",
                                       "img1.png", "IMG01.GIF", "img2.JPG"},
                                      {"F-5 Freedom Fighter",
                                       "B-50 Superfortress",
                                       "A-10 Thunderbolt II", "F-14 Tomcat"}};

  for (auto &files : filesList) {
    vector<string> answer = solution(files);
    for (auto &file : answer) {
      cout << file << " | ";
    }
    cout << endl;
  }
  int a = ' ';
  cout << a;
  return 0;
}

// 입력: ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF",
// "img2.JPG"] 출력: ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG",
// "img10.png", "img12.png"] 입력: ["F-5 Freedom Fighter", "B-50 Superfortress",
// "A-10 Thunderbolt II", "F-14 Tomcat"] 출력: ["A-10 Thunderbolt II", "B-50
// Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]