
  while (left + 1 < right) {
    // 왼쪽 -> 오른쪽 갔더니 최소값보다 작으면 갱신
    if (prices[left + 1] <= min) {
      min = prices[++left];
    }
    // 왼쪽 -> 오르쪽 갔더니 최소값보다 크면
    else {
      // 오른쪽 -> 왼쪽 움직이기 시작함.
      while (left < right - 1) {
        // 오른쪽 -> 왼쪽 간 갔더니 최대값보다 크면 갱신
        if (prices[right - 1] >= max) {
          max = prices[--right];
        }
        // 최대값보다 작으면 다시 왼쪽 -> 오른쪽 움직이기 시작함
        else {
          left++;
          break;
        }
      }
    }
  }
  console.log(max, min);
  return max - min < 0 ? 0 : max - min;