function makeSharp(length) {
  return Array(length).fill("#").join("");
}
function isSame(wordArr, dicWord, k) {
  for (let i = 0; i < dicWord.length; i++) {
    const newDicWord = dicWord.slice(i);
    const isSame = wordArr.every(
      (str, idx) => str === "." || str === newDicWord[idx]
    );
    // wordArr의 점 갯수 카운팅
    const dotCnt = wordArr.filter((str) => str === ".").length;
    // wordArr길이 - 점 갯수 = 점 제외한 단어 갯수
    // 점 갯수 * k = 최대 점 갯수
    // 그냥 점 갯수 = 최소 점 갯수
    // 최대 점 갯수 >= dicword길이라면 && isSame이라면 true 리턴
    if (dotCnt * (k - 1) + wordArr.length >= dicWord.length && isSame)
      return true;
  }
  return false;
}

function solution(k, dic, chat) {
  chat = chat.split(" ");

  chat.forEach((word, wordIdx) => {
    // 1. 사전에 있는 단어인지 확인
    if (dic.includes(word)) {
      // 있다면 chat의 단어를 #으로 교체함
      chat[wordIdx] = makeSharp(word.length);
      // 점이 있다면
    } else if (word.includes(".")) {
      // dic 순환
      for (let i = 0; i < dic.length; i++) {
        const reg = /[a-z]{1,k}/g;
        // word.
        const replaceWord = word.replaceAll(".", reg.);
        console.log(replaceWord);

        if (dic[i] === replaceWord) {
          chat[wordIdx] = makeSharp(word.length);
          break;
        }
      }
    }
  });
  return chat.join(" ");
}

// 단어의 점을 k길이 이하의 알파벳으로 대체할때 비속어면 .이 포함된 단어 길이만큼 #로 대체
// 정수k, 사전 dic, 채팅 chat
const dic = ["abcde", "cdefg", "efgij"];
// const dic = ["slang", "badword"];
const chat = ".. ab. cdefgh .gi. .z.";
// const chat = "badword ab.cd bad.ord .word sl.. bad.word";
const result = solution(3, dic, chat);

console.log(result);
