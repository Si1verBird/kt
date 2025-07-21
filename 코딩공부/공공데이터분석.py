import pandas as pd

try:
    # 파일 불러오기 시도
    df = pd.read_excel('/Users/eunse/Downloads/가계수지data.xlsx')
    print("파일 불러오기 성공!")
    
    # 데이터 기본 정보 확인
    print("\n데이터 크기:", df.shape)
    print("\n처음 5행:")
    print(df.head())
    
    # 컬럼명 확인
    print("\n컬럼 목록:")
    print(df.columns.tolist())

except FileNotFoundError:
    print("파일을 찾을 수 없습니다. 파일 경로를 확인해주세요.")
    print("현재 설정된 경로: /Users/eunse/Downloads/가계수지data.xlsx")
    
except Exception as e:
    print("에러 발생:", str(e))

# 주요 컬럼 예시
# ['가구주연령', '가구주직업', '01.식료품·비주류음료', '02.주류·담배', ..., '가계지출']