// 문제링크: https://www.acmicpc.net/problem/1620
// 시작날짜: 2023.08.26
// 시작시간: 18:17
// 종료시간: 18:26
// 소요시간: 00:09

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = ` 
26 5
Bulbasaur
Ivysaur
Venusaur
Charmander
Charmeleon
Charizard
Squirtle
Wartortle
Blastoise
Caterpie
Metapod
Butterfree
Weedle
Kakuna
Beedrill
Pidgey
Pidgeotto
Pidgeot
Rattata
Raticate
Spearow
Fearow
Ekans
Arbok
Pikachu
Raichu
25
Raichu
3
Pidgey
Kakuna
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ')})();

const [N, M] = input().map(Number);
const map = new Map();
let result = '';

for (let i = 1; i < N + 1; i++) {
  const name = input().toString();
  map.set(i.toString(), name);
  map.set(name, i);
}
for (let i = 0; i < M; i++) {
  const quest = input().toString();
  result += `${map.get(quest)}\n`;
}
console.log(result);
