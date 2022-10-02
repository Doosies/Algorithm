"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heap = void 0;
class Heap {
    constructor() {
        this.arr = [];
    }
    push(node, val) {
        const _node = {
            node,
            val
        };
        this.arr.push(_node);
        this.heapifyUp();
    }
    pop() {
        const lastIdx = this.getLastIdx();
        let outData;
        [this.arr[0], this.arr[lastIdx]] =
            [this.arr[lastIdx], this.arr[0]];
        outData = this.arr.pop();
        this.heapifyDown();
        return outData;
    }
    heapifyUp() {
        let idx = this.getLastIdx();
        while (idx > 0) {
            const parent = this.getParent(idx);
            // 최소힙, 부모의 val이 자식보다 작을경우
            if (this.arr[parent].val > this.arr[idx].val) {
                // 구조분해할당으로 두 값을 스왑해줌
                [this.arr[parent], this.arr[idx]] =
                    [this.arr[idx], this.arr[parent]];
            }
            idx = parent;
        }
    }
    heapifyDown() {
        const leafIdx = Math.ceil(this.getLastIdx() / 2);
        let idx = 0;
        // 리프노드에 갈 떄 까지 반복.
        while (idx < leafIdx) {
            const left = this.getLeft(idx);
            const right = this.getRight(idx);
            let minChild;
            // 오른쪽에 자식이 있다면 왼쪽, 오른쪽 val중 더 작은쪽이 minChilc
            if (right <= this.getLastIdx()) {
                minChild = this.arr[left].val <= this.arr[right].val
                    ? left
                    : right;
                // 오른쪽에 자식이 없다면 무조건 왼쪽이 minChild
            }
            else {
                minChild = left;
            }
            // arr[idx]가 arr[minChild]보다 클경우 두개를 교환한다.
            if (this.arr[idx].val > this.arr[minChild].val) {
                [this.arr[idx], this.arr[minChild]] =
                    [this.arr[minChild], this.arr[idx]];
            }
            // 현재 idx를 변경해준다.
            idx = minChild;
        }
    }
    getParent(idx) {
        return Math.floor((idx - 1) / 2);
    }
    getLeft(idx) {
        return (idx * 2) + 1;
    }
    getRight(idx) {
        return (idx * 2) + 2;
    }
    getLastIdx() {
        return this.arr.length - 1;
    }
    getArr() {
        return this.arr;
    }
}
exports.Heap = Heap;
//# sourceMappingURL=Heap.js.map