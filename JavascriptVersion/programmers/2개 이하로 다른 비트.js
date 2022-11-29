const solution = numbers => {
  numbers = numbers.reduce((arr, num) => {
    if (num % 2 === 0) arr.push(num + 1);
    else {
      const bit = '0' + num.toString(2);
      const idx = bit.lastIndexOf('01');
      const rst = `${bit.slice(0, idx)}10${bit.slice(idx + 2)}`;
      arr.push(parseInt(rst, 2));
    }
    return arr;
  }, []);
  return numbers;
};
console.log(solution([2, 7]));
// 14 = 10111 답: 11
// console.log(`0b1001` << 1);
// let a = '123';
// a[0] = 9;
// console.log(a);
// f(x) = x보다 크고 x와 비트가 1~2개 다른 수들 중 제일 작은수

// f(2) = 10
// 1000101000010010011111
// 1000000000000000
// 101
// 111 -> 왼쪽으로 1비트 : 1110
// 둘다 1이면 0, 0,1이면 1
// 1110
// 0111
// 1001
// 100000000000000
// 전부다 1이면 왼쪽으로 1비트 쉬프트후 두번째꺼 0, 마지막꺼 1
// 저부다 1이 아니면 제일 오른쪽 0을 1로 변경
