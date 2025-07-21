# ✅ 기본 수준
# 팩토리얼 계산
# 정수 n이 주어졌을 때 n! (1×2×…×n)을 재귀함수로 구현하세요.
# def factorial(n):
#     if n == 0 or n == 1:
#         return 1
#     else : 
#         return factorial(n-1) * n



# 자연수 n까지의 합
# 정수 n이 주어졌을 때 1 + 2 + ... + n의 값을 재귀로 구하세요.

# def adder(n):
#     if n == 1 :
#         return 1
#     else : 
#         return n + adder(n-1)

# print(adder(4))


# 문자열 뒤집기
# 문자열 s가 주어졌을 때, 재귀를 이용하여 이를 뒤집으세요.
# 예: "hello" → "olleh"

def flipper(s):
    if len(s)<= 1:
        return s
    else : 
        return flipper(s[1:]) +s[0] #ello + h  ->  llo + e + h

print(flipper("kim-min-seong-is-babo!!"))

