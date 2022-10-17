function solution(cacheSize, cities) {
  // const cache = {};
  const cache = [];
  let runTime = 0;

  cities.forEach(city => {
    city = city.toLowerCase();
    // 현재 시티의 캐시가 있다면, runTime +1
    // 현재 시티를 가장 앞으로 옮김
    const nowIdx = cache.findIndex(c => c === city);
    if (nowIdx > -1) {
      const nowCity = cache[nowIdx];
      cache.splice(nowIdx, 1);
      cache.push(nowCity);
      runTime += 1;
    }
    // 현재 시티의 캐시가 없다면
    else {
      if (cacheSize > 0) {
        // cache가 꽉 차있다면 가장 많이 접근 안한거 제거함(0번째꺼)
        if (cache.length === cacheSize) {
          cache.shift();
        }
        cache.push(city);
      }
      runTime += 5;
    }
  });
  console.log(cache);
  return runTime;
}

// console.log(
//   solution(3, [
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//   ]),
// );
console.log(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']));
// console.log(solution(0, [0, 1, 2, 3, 4, 1, 3, 2, 3, 4, 0, 1]));
// 캐시: 0 ~ 30
// cities: 최대수 10만
// 공백오직 영문자로 구성, 대/소문 구분 x, 이름은 최대 20자

// 입력된 도시이름 배열을 순서대로 처리할 때, 총 실행시간 출력
// 캐시 교체 알고리즘은 Least Recently Used 사용

// cache hit: 실행시간 1,
// cache miss: 시행시간 5

// 맨 앞으로 가져오는게 x
