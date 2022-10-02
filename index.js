/** @format */
// 1. 길이가 10자리 미만인 랜덤한 숫자 배열 16개를 생성하는 함수를 생성하시오.
// 2. 1번에서 생성한 문자열을 4개의 열로 가지는 테이블을 생성하시오.
// 3. 2번에서 생성한 테이블을 4개의 행으로 가지는 테이블을 생성하시오.
// 4. document.ready() 함수를 사용하여 3번에서 생성한 테이블을 body에 추가하시오.
//
const makeRandomArray = () => {
  let result = [];
  for (let i = 0; i < 16; i++) {
    let random = Math.floor(Math.random() * 10000000000);
    result.push(random);
  }
  return result;
};

const makeTable = (array) => {
  const target = document.getElementById("play");
  const table = document.createElement("table");
  let idx = 0;

  for (let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      const td = document.createElement("td");
      td.innerHTML = array[idx++];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  target.appendChild(table);
};

$(document).ready(() => {
  const array = makeRandomArray();
  makeTable(array);
});
