#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int solution(string skillString, vector<string> skill_trees) {
  vector<char> skill = vector(skillString.begin(), skillString.end());
  int result = 0;

  for (auto skills : skill_trees) {
    int nowIdx = 0;
    bool flag = false;
    for (auto nowSkill : skills) {
      // 만약 skill[nowIdx]와 같다면 같다면 nowIdx ++
      if (skill[nowIdx] == nowSkill) {
        nowIdx++;
      }
      // skill[nowIdx]와 같지 않은데 skill 안에 있다면 break;
      else if (find(skill.begin(), skill.end(), nowSkill) != skill.end()) {
        flag = true;
        break;
      }
    }
    if (flag == false)
      result++;
  }
  return result;
}
int main() {
  int result = solution("CBD", {"BACDE", "CBADF", "AECB", "BDA"});
  cout << result << endl;
  return 0;
}