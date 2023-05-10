import sys

sys.stdin = open("input.txt", "r")

dp = [[1 for _ in range(i)] for i in range(1, 11)]
ans = ["1", "1\n1 1"]
T = int(input())

for i in range(2, 10):
    for j in range(1, i):
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
    ans.append(f"{ans[i-1]}\n{' '.join(map(str,dp[i]))}")


for i in range(1, T + 1):
    N = int(input())
    print(f"#{i}")
    print(ans[N - 1])
