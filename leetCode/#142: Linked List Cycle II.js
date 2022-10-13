function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const head = new ListNode(3, null);
// head.next = new ListNode(2, null);
// head.next.next = new ListNode(0, null);
// head.next.next.next = new ListNode(4, null);
// head.next.next.next.next = head.next.next;
// head.next.next = head;

var detectCycle = function (head) {
  // 2칸씩 증가
  let fast = head?.next?.next;
  // 1칸씩 증가
  let slow = head?.next;

  // 두개가 만날때까지 돌림
  while (fast !== slow) {
    fast = fast?.next?.next;
    slow = slow?.next;
  }
  // 빠른걸 헤드로 옮김
  fast = head;

  // 그러고서 하나씩 움직여서 만날때까지 돌림
  while (fast !== slow) {
    fast = fast?.next;
    slow = slow?.next;
  }

  // fast가 존재하지 않는다면 null을 리턴
  return fast ?? null;
};

console.log(detectCycle(head));
