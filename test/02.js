// 길이가 같은 큐가 두개있음
// 하나의 큐를골라 원소를 추출, 추출된 원소를 다른 큐에 집어넣음
// 위의 작업을 통해 각 큐의 원소 합이 같게 만들려고함
// 이때 필요한 작업의 최소횟수를 구함
// 한번의 pop, push를 합쳐서 작업 1회로 간주함

// pop을 하면 원소의 왼쪽 끝에 요소를 제거함
// push를 하면 오른쪽 끝에 원소를 삽입함

function solution(queue1, queue2) {
  const getSum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

  const sumArray = [...queue1, ...queue2, ...queue1, ...queue2];
  const half = getSum(sumArray) / 4;

  let [left, right] = [0, queue1.length];
  let sum = getSum(queue1);
  let cnt = 0;

  for (let i = 0; i < queue1.length * 3; i++) {
    if (sum > half) sum -= sumArray[left++];
    else if (sum < half) sum += sumArray[right++];
    else return cnt;

    cnt++;
  }
  return -1;
}

const f = [
  [3, 2, 7, 2],
  [4, 6, 5, 1],
];
// const f = [
//   [1, 1, 5],
//   [1, 1, 1],
// ];
console.log(`f: ${solution(f[0], f[1])}`);
