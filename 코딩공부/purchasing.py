import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import time

# ---------------------------------------------------------------------
# 1. 기본 설정 및 메인 페이지 가져오기
# ---------------------------------------------------------------------
base_url = "https://dir.indiamart.com/impcat/ms-bolt-nut.html"
headers = {'User-Agent': ''
'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}  # 브라우저 에이전트 설정

response = requests.get(base_url, headers=headers)
if response.status_code != 200:
    print("메인 페이지를 불러오는데 실패했습니다.")
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

# ---------------------------------------------------------------------
# 2. 목록에서 각 공급사(제품) 항목 찾기
# 실제 HTML 구조에 따라 아래 선택자는 수정해야 합니다.
# 아래 예제에서는 리스트 아이템이 <div class="list-item"> 안에 있다고 가정합니다.
# ---------------------------------------------------------------------
listings = soup.find_all('div', class_='list-item')

supplier_data_list = []  # 추출된 데이터를 담을 리스트

for listing in listings:
    # 제목 또는 제품 설명이 들어있는 요소 (예: <h2> 태그)에서 텍스트 추출
    title_elem = listing.find('h2')
    title_text = title_elem.get_text(strip=True) if title_elem else ""
    
    # 5mm 여부 필터링 (대소문자 구분 없이)
    if "5mm" not in title_text.lower():
        continue
    
    # 평점 추출 (예: <span class="rating"> 요소)
    rating_elem = listing.find('span', class_='rating')
    try:
        rating = float(rating_elem.get_text(strip=True)) if rating_elem else 0
    except:
        rating = 0
    if rating < 4:
        continue
    
    # 상세 페이지 링크 추출 (anchor 태그의 href)
    link_elem = listing.find('a', href=True)
    if link_elem:
        detail_url = link_elem['href']
        if detail_url.startswith("/"):
            detail_url = "https://dir.indiamart.com" + detail_url
    else:
        detail_url = None

    # 기본값 초기화 (재질, 연락처)
    material = None
    contact = None

    # -----------------------------------------------------------------
    # 3. 상세 페이지 크롤링: 재질 및 연락처(예: 전화번호) 추출
    # -----------------------------------------------------------------
    if detail_url:
        detail_resp = requests.get(detail_url, headers=headers)
        if detail_resp.status_code == 200:
            detail_soup = BeautifulSoup(detail_resp.text, 'html.parser')
            
            # 재질 추출: 페이지 내 "재질" 또는 "Material" 라벨이 있는 경우
            material_label = detail_soup.find(text=re.compile("재질|Material", re.IGNORECASE))
            if material_label:
                # 라벨 바로 다음 요소의 텍스트를 재질 값으로 가정
                next_elem = material_label.find_next()
                if next_elem:
                    material = next_elem.get_text(strip=True)
            
            # 연락처 추출: 전화번호 패턴 (간단한 정규표현식 예제)
            detail_text = detail_soup.get_text()
            phone_matches = re.findall(r'\+?\d[\d\s\-]{7,}', detail_text)
            if phone_matches:
                contact = phone_matches[0]  # 첫 번째 전화번호 사용
        # 서버 부하를 줄이기 위해 잠시 대기
        time.sleep(1)

    # -----------------------------------------------------------------
    # 4. 데이터 저장: 추출 결과를 리스트에 추가
    # -----------------------------------------------------------------
    supplier_data = {
        '제목': title_text,
        '평점': rating,
        '재질': material,
        '연락처': contact,
        '상세페이지 URL': detail_url
    }
    supplier_data_list.append(supplier_data)

# ---------------------------------------------------------------------
# 5. 결과 DataFrame 변환 및 CSV 저장
# ---------------------------------------------------------------------
df = pd.DataFrame(supplier_data_list)
print(df)

# CSV 파일로 저장 (UTF-8 BOM 포함: 한글 문제 방지)
df.to_csv('supplier_data.csv', index=False, encoding='utf-8-sig')