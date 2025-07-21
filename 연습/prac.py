from debugger import Debugger  # Debugger 클래스가 정의된 파일에서 가져오기

# 디버깅할 함수 정의
def sum_numbers(numbers):
    total = 0
    for number in numbers:
        breakpoint()  # 여기에 중단점 추가
        if number % 2 == 0:  # 짝수 확인
            print(f"Even number found: {number}")
        else:
            print(f"Odd number found: {number}")
        total += number  # 합계 계산
    return total

# 디버거로 감싸기
with Debugger():
    numbers = [1, 2, 3, 4, 5]
    result = sum_numbers(numbers)
    print(f"Total sum: {result}")
    