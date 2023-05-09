# https://www.acmicpc.net/problem/21758
from sys import stdin as s

s = open("input.txt", "r")


def input():
    return list(map(int, s.readline().split()))


def run():
    while True:
        N = input()
        arr = input()

        if len(N) == 0:
            break

        sol(N[0], arr)
        print("-------------")


def sol(n, arr):
    dp = [0] * n
    dp[0] = arr[0]
    result = max(arr) * 2

    # 누적합
    for i in range(1, n):
        dp[i] = dp[i - 1] + arr[i]

    # 왼쪽 -> 오른쪽의 누적합 최대값
    for i in range(1, n - 1):
        left = dp[i - 1] - dp[0]
        right = dp[n - 1] - dp[i]
        sum = left + right * 2
        result = max(sum, result)

    # 오른쪽 -> 왼쪽 누적합 최대값
    for i in range(n - 2, 0, -1):
        left = dp[i - 1]
        right = dp[n - 2] - dp[i]
        sum = left * 2 + right
        result = max(sum, result)

    print(result)


run()


# 2 3 2 2
#  2 + 2 + 2, 2+2
#  2+3+2, 2
