#include <algorithm>
#include <iostream>
#include <math.h>
#include <numeric>
#include <regex>
#include <sstream>
#include <string>
#include <tuple>
#include <unordered_map>
#include <vector>

using namespace std;
typedef pair<string, vector<string>> inputType;
typedef tuple<int, int, string, string> musicInfoType;

string solution(string m, vector<string> musicinfosInput) {
  vector<musicInfoType> musicInfos;
  vector<musicInfoType> results;
  unordered_map<string, string> hs = {
      {"C#", "c"}, {"D#", "d"}, {"F#", "f"}, {"G#", "g"}, {"A#", "a"}};

  // 문자열을 자름
  auto split = [](string s, string pattern) {
    regex reg(pattern);
    sregex_token_iterator it(s.begin(), s.end(), reg, -1);
    return vector<string>(it, {});
  };

  // 시간을 얻어옴
  auto getTime = [&split](string time) -> int {
    vector<string> splited = split(time, ":");
    return stoi(splited[0]) * 60 + stoi(splited[1]);
  };

  // # 들어간 문자를 치환함
  auto getConvertedNotes = [&hs](string notes) {
    string convertedNotes;
    for (int i = 0; i < notes.length(); i++) {
      string now = notes.substr(i, 1);
      if (i + 1 < notes.length() && notes[i + 1] == '#') {
        now.append("#");
        now = hs[now];
        i++;
      }
      convertedNotes.append(now);
    }
    return convertedNotes;
  };

  // 시트안에 멜로디가 존재하는지 확인
  auto isMelodyInSheetMusic = [&](int playTime, string sheetMusic) {
    string fullSheet = sheetMusic;
    regex regexp(m);
    smatch match;

    if (playTime > sheetMusic.size())
      for (int i = 0; i <= ceil(playTime / sheetMusic.size()); i++)
        fullSheet.append(sheetMusic);

    fullSheet = fullSheet.substr(0, playTime);
    regex_search(fullSheet, match, regexp);
    return m.compare(match.str()) == 0 ? true : false;
  };

  // 정보를 쓸모있게 재가공
  for (string &musicinfos : musicinfosInput) {
    vector<string> splited = split(musicinfos, ",");
    musicInfos.push_back(make_tuple(getTime(splited[0]), getTime(splited[1]),
                                    splited[2], splited[3]));
  }

  m = getConvertedNotes(m);
  // 모든
  for (auto &nowMusicInfo : musicInfos) {
    auto [startT, endT, musicName, sheetMusic] = nowMusicInfo;
    int musicLength = sheetMusic.size();
    int playTime = endT - startT;
    // 멜로디가 악보와 일치한다면
    if (isMelodyInSheetMusic(playTime, getConvertedNotes(sheetMusic))) {
      results.push_back(nowMusicInfo);
    }
  }

  // 1-0 : 시간, 2: 이름, 3: 악보
  sort(results.begin(), results.end(), [](auto result1, auto result2) {
    auto [st1, et1, a, b] = result1;
    auto [st2, et2, c, d] = result2;
    // 플레이시간 긴거
    if (et1 - st1 > et2 - st2)
      return true;
    if (st1 < st2)
      return true;
    return false;
  });

  return results.size() == 0 ? "(None)" : get<2>(results[0]);
}

int main() {
  vector<inputType> inputs = {
      {"ABCDEFG",
       {
           "12:02,12:16,HELLO,CDEFGAB",
           "13:00,13:05,WORLD,ABCDEF",
           "12:01,12:15,TEST,ABCDEFG",
       }},
      {"CC#BCC#BCC#BCC#B",
       {"03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"}},
      {"ABC", {"12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"}}};

  for (auto &input : inputs) {
    auto [m, musicinfos] = input;
    string answer = solution(m, musicinfos);
    cout << answer << endl;
  }

  return 0;
}

// 7 ~ 9, 18 ~ 30
// 7 ~ 9, 18 ~ 21, 25 ~ 28, 30
// 4 ~ 6, 11, 18, 19, 21 ~ 24, 29 ~ 30
// 4, 5, 11, 18, 19, 26, 30
// 3,4,5 18, 19, 26, 30

// CDEFGABCDEFGABCDEFGAB

// ABCDEFGABCDEFG
// CC#BCC#BCC#BCC#BCC#BCC#BCC#BCC
