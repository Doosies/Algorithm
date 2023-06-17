function getDate(date) {
  const [year, month, day] = date.split('.').map(Number);
  return year * 12 * 28 + month * 28 + day;
}

function solution(today, terms, privacies) {
  const termsDict = {};
  const result = [];

  today = getDate(today);

  terms.forEach(termsStr => {
    const [terms, month] = termsStr.split(' ');
    termsDict[terms] = +month * 28;
  });

  privacies.forEach((privacy, i) => {
    const [dateStr, terms] = privacy.split(' ');
    const termsDate = getDate(dateStr) + termsDict[terms];

    if (today >= termsDate) {
      result.push(i + 1);
    }
  });
  return result;
}

console.log(
  solution(
    '2022.05.19',
    ['A 6', 'B 12', 'C 3'],
    ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
  ),
);

console.log(
  solution(
    '2020.01.01',
    ['Z 3', 'D 5'],
    ['2019.01.01 D', '2019.11.15 Z', '2019.08.02 D', '2019.07.01 D', '2018.12.28 Z'],
  ),
);
