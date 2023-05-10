import sys

sys.stdin = open("input.txt", "r")

T = int(input())

for i in range(1, T + 1):
    N = int(input())
    arr = list(map(int, input().split(" ")))
    result = 0
    maxn = arr[-1]

    for j in range(len(arr) - 1, -1, -1):
        if arr[j] < maxn:
            result += maxn - arr[j]
        else:
            maxn = arr[j]
    print(f"#{i} {result}")
