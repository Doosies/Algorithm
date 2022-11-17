#include <regex>
#include <sstream>
#include <vector>
using namespace std;

auto split = [](string str, char delemiter) -> vector<string> {
  vector<string> result;
  stringstream ss(str);
  string tmp;
  while (getline(ss, tmp, delemiter)) {
    result.push_back(tmp);
  }
  return result;
};

auto split = [](string s, string pattern) {
  regex reg(pattern);
  sregex_token_iterator it(s.begin(), s.end(), reg, -1), end;
  return vector<string>(it, end);
};