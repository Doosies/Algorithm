import { cursorTo } from "readline";

const stdin: string[] = (process.platform ==='linux'
? require('fs').readFileSync(0, 'utf-8')
: `
8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1
`).trim().split('\n');

const input = (()=>{
    let line = 0;
    return ()=> stdin[line++].split(" ").map( v => +v);
})();

const N = +input();
const arr = Array.from({length:N}, () => input());

function cut(rowS: number, colS: number, size: number): number[] {
    const start = arr[rowS][colS];
    let isFourSquare = false;

    // 모두 같은 색인지 판단하는 for문
    // isFourSquare = true일 경우 모두 같은색인 정사각형
    // isFourSquare = false일 경우 재귀 한번 더 들어감
    out: for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            if (arr[i][j] !== start) {
                isFourSquare = true;
                break out;
            }
        }
    }

    if (size === 1 || isFourSquare) {
        if (start === 0) {
            return [1,0];
        }else {
            return [0,1];
        }
    }else {
        const S = size/2
        const lu = cut(rowS, colS, S);
        const ru = cut(rowS, colS + S, S);
        const ld = cut(rowS + S, colS, S);
        const rd = cut(rowS + S, colS + S, S);

        return [
            lu[0] + ru[0] + ld[0] + rd[0],
            lu[1] + ru[1] + ld[1] + rd[1],
        ]
    }
}

const test = cut(0,0,8);
console.log(test);