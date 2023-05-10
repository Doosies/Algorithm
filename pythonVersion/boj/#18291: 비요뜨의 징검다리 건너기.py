# 풀이 1 (원래 풀이법)
from sys import stdin as s


def input():
    return list(map(int, s.readline().split()))


N = [input()[0] for _ in range(input()[0])]
mod = 1000 * 1000 * 1000 + 7


def power(n, k):
    result = 1
    while k > 0:
        if k % 2:
            result = (result * n) % mod
        n = (n * n) % mod
        k //= 2
    return result


for v in N:
    print(power(2, v - 2))


# 풀이 2 (pow 함수 사용한 풀이법)
from sys import stdin as s

N = [int(s.readline()) for _ in range(int(s.readline()))]
for v in N:
    print(1 if v == 1 else pow(2, v - 2, 10**9 + 7))
