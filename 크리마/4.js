'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'longestChain' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY words as parameter.
 */

// 문자열의 앞 혹은 뒤를 잘라서 dfs 돌림
// 만약 dict 안에 없거나, 문자열 길이가 1이라면 return
function max(a, b) {
  return a >= b ? a : b;
}

function dfs(word, dict, chainLength, memo) {
  let maxChainLength = chainLength;

  for (let i = 0; i < word.length; i++) {
    const front = word.slice(0, i);
    const back = word.slice(i + 1);
    const newWord = front + back;
    if (dict[newWord] && !memo[newWord]) {
      memo[newWord] = true;
      const length = dfs(newWord, dict, chainLength + 1, memo);
      maxChainLength = max(maxChainLength, length);
    }
  }

  return maxChainLength;
}

function longestChain(words) {
  let result = 0;
  const dict = {};

  words.forEach(word => (dict[word] = true));
  words.forEach(word => {
    result = max(result, dfs(word, dict, 1, {}));
  });

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const wordsCount = parseInt(readLine().trim(), 10);

  let words = [];

  for (let i = 0; i < wordsCount; i++) {
    const wordsItem = readLine();
    words.push(wordsItem);
  }

  const result = longestChain(words);

  ws.write(result + '\n');

  ws.end();
}
