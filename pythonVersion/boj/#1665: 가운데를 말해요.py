from sys import stdin as s

s = open("input.txt", "r")


def input():
    return list(map(int, s.readline().split()))


N = input()[0]
for i in range(N):
    num = input()[0]
    print(num)


# -99 1 2 5 5 7 10
