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
 * Complete the 'findRange' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER num as parameter.
 */

function findRange(num) {
  const numString = String(num);
  const firstNum = numString[0];

  let minNum = '';
  let maxNum = '';

  // 첫째자리 1이 아니면 첫째를 1로 바꾼게 최소
  // 첫쨰자리 1이면 1 or 0 안만날때까지 for 돌리다가 처음만난 숫자를 전부 바꿔줌
  // 첫째자리 9가 아니면 첫째를 9로 바꾼게 최대
  // 첫째자리 9면 9 안만날때까지 for 돌리다가 처음만난 숫자를 전부 바꿔줌.

  if (firstNum === '1') {
    let changeNum = -1;
    for (let i = 0; i < numString.length; i++) {
      if (numString[i] !== '0' && numString[i] !== '1') {
        changeNum = numString[i];
        break;
      }
    }
    minNum = numString.replaceAll(changeNum, '0');
  } else {
    minNum = numString.replaceAll(firstNum, '1');
  }

  if (firstNum === '9') {
    let changeNum = -1;
    for (let i = 0; i < numString.length; i++) {
      if (numString[i] !== '9') {
        changeNum = numString[i];
        break;
      }
    }
    maxNum = numString.replaceAll(changeNum, '9');
  } else {
    maxNum = numString.replaceAll(firstNum, '9');
  }

  return +maxNum - +minNum;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const num = parseInt(readLine().trim(), 10);

  const result = findRange(num);

  ws.write(result + '\n');

  ws.end();
}
