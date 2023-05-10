import sys

sys.stdin = open("input.txt", "r")

T = int(input())
for i in range(1, T + 1):
    S = input()
    MIN = float("inf")
    for j in range(1, len(S)):
        left = int(S[:j])
        right = int(S[j:])
        MIN = min(MIN, left + right)
    print(f"#{i} {MIN}")
