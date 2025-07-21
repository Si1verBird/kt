import time
import traceback
from functools import wraps

class Debugger:
    def __init__(self):
        self.start_time = None
        
    def __enter__(self):
        print("\n=== 디버깅 시작 ===")
        self.start_time = time.time()
        return self
        
    def __exit__(self, exc_type, exc_value, exc_tb):
        end_time = time.time()
        execution_time = end_time - self.start_time
        
        print("\n=== 디버깅 결과 ===")
        print(f"실행 시간: {execution_time:.4f}초")
        
        if exc_type is not None:
            print("\n=== 오류 발생 ===")
            print(f"오류 유형: {exc_type.__name__}")
            print(f"오류 메시지: {exc_value}")
            print("\n스택 트레이스:")
            traceback.print_tb(exc_tb)
            return True  # 예외 처리 완료
            
        print("=== 디버깅 종료 ===\n")
        return False  # 예외가 없음