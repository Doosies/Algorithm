function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var mergeTwoLists = function (list1, list2) {
  let node = new ListNode(-Infinity);
  let last = node;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      last.next = list1;
      last = list1;
      list1 = list1.next;
    } else {
      last.next = list2;
      last = list2;
      list2 = list2.next;
    }
  }

  if (!list1) last.next = list2.val;
  if (!list2) last.next = list1.val;

  return node.next;
};
console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));
