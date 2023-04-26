from sys import stdin as s

s = open("input.txt", "r")


def input():
    return list(map(int, s.readline().split()))


N = input()[0]
arr = input()
stack = []

for i in range(N):
    while stack and arr[i] > arr[stack[-1]]:
        arr[stack.pop()] = arr[i]
    stack.append(i)

while stack:
    arr[stack.pop()] = -1

print(" ".join(map(str, arr)))
