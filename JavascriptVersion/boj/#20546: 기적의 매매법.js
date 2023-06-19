//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
10
1 2 3 1 1 1 1 1 1 1 1 1 1 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

// 1번째줄: 두명에게 주어진 현금
// 2번째줄: 1.1 ~ 1.14일의 주가 주어짐.
// 준현이 크면 BNP, 성민이 크면 TIMING, 같다면 SAMESAME 출력
// 준현: Buy and Pray
// 주식을 오늘 살수있으면 최대한 많이산다. 욕심쟁이라서
//

// 성민: 타이밍
// 현재 100원, 주가 11원이라면 99원어치 주식 매수. 현재금액 초과는 사지않음
// 3일연속 전일대비 상승하면 전량매도
// 3일연속 전일대비 하락하면 전량매수

// 1월 14일의 자산은 (현금 + 1월 14일의 주가 × 주식 수)로 계산

// 준현잔액 = 잔액
// 준현_주식_보유량 = [개수, 산금액]
// 성민잔액 = 잔액
// 성민_주식_보유량 = [개수, 산금액]
//
// 연속상승 = 0
// 연속하락 = 0
//
// for 일별금액(현재금액, idx):
//   준현은 현재 살수 있으면 무조건 삼
//   if 준현잔액 > 현재금액: (현재100원, 주식 11원이라면, 99개 살수있음)
//     구매개수 = Math.floor(준현잔액 / 현재금액)
//     구매액 = 현재금액 * 구매개수
//     준현_주식_보유량[0] += 구매개수
//     준현_주식_보유량[1] += 구매액
//
//   현준은 3일연속 상승이라면 전량매도
//        3일연속 하락이라면 전량매수
//   if (idx>0 and 일별금액[idx-1] < 현재금액):(상승한다면 연속상승 += 1)
//     연속상승 ++
//   else: 연속상승 = 0
//   if (idx>0 and 일별금액[idx-1] < 현재금액):(하락한다면 연속하락 += 1)
//     연속하락++
//   else: 연속하락 = 0
//
//   if (연속상승 === 3): (3일연속 연속상승하면 전량매도)
//     성민잔액 += 성민_주식_보유량[0] * 현재금액
//     성민_주식_보유량[0] = 0
//     성민_주식_보유량[1] = 0
//   else if (연속하락 === 3): (전략매수)
//     구매개수 = Math.floor(성민잔액 / 현재금액)
//     구매액 = 현재금액 * 구매개수
//     성민_주식_보유량[0] += 구매개수
//     성민_주식_보유량[1] += 구매액

const firstMoney = +input();
const stockPriceByDay = input();
let joonMoney = firstMoney;
let joonStock = 0; //[0, 0];
let seongMoney = firstMoney;
let seongStock = 0; //[0, 0];

let up = 0;
let down = 0;

const buyStock = (moneyBalance, nowStockPrice) => {
  return Math.floor(moneyBalance / nowStockPrice);
};

stockPriceByDay.forEach((stockPrice, idx) => {
  if (joonMoney >= stockPrice) {
    const stockCnt = buyStock(joonMoney, stockPrice) || 0;
    joonStock += stockCnt;
    joonMoney -= stockCnt * stockPrice;
  }
  if (idx !== 0) {
    if (stockPriceByDay[idx - 1] < stockPrice) up++;
    else up = 0;

    if (stockPriceByDay[idx - 1] > stockPrice) down++;
    else down = 0;

    if (up >= 3) {
      seongMoney += seongStock * stockPrice;
      seongStock = 0;
    } else if (down >= 3) {
      const stockCnt = buyStock(seongMoney, stockPrice);
      seongStock += stockCnt;
      seongMoney -= stockCnt * stockPrice;
    }
  }
});

joonMoney += joonStock * stockPriceByDay.at(-1);
seongMoney += seongStock * stockPriceByDay.at(-1);

if (joonMoney > seongMoney) console.log('BNP');
if (joonMoney < seongMoney) console.log('TIMING');
if (joonMoney === seongMoney) console.log('SAMESAME');

console.log(joonMoney, seongMoney, joonStock, seongStock);
