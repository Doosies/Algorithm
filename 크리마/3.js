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
 * Complete the 'maxLength' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER k
 */

// k 이하 요소가 포함되는 배열중 가장 긴거 ( 연속배열)

function maxLength(a, k) {
  let left = 0;
  let right = 0;
  let sum = 0;
  let maxLength = 0;
  let currLength = 0;

  while (right < a.length) {
    // if sum <= k: 오른쪽 옮김 (갱신)
    // else: 왼쪽 옮김 (갱신)
    if (sum <= k) {
      sum += a[right++];
      currLength++;
    } else {
      sum -= a[left++];
      currLength--;
    }
    if (sum <= k) {
      maxLength = Math.max(maxLength, currLength);
    }
  }
  return maxLength;
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const aCount = parseInt(readLine().trim(), 10);

  let a = [];

  for (let i = 0; i < aCount; i++) {
    const aItem = parseInt(readLine().trim(), 10);
    a.push(aItem);
  }

  const k = parseInt(readLine().trim(), 10);

  const result = maxLength(a, k);

  ws.write(result + '\n');

  ws.end();
}
