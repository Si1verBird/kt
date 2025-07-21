def solution(n, w, num):
    row_num = n//w #꽉찬 행 개수
    remain = n % w #나머지 (제일 마지막 행에 들어갈, 0일 수도 있음)
    
    #1. 먼저 0,1 로 이루어진 리스트형 행렬을 만든다
    list_row = []
    
    for i in range(w):
        list_row.append(1)
    
    matrix = [list_row.copy() for i in range(row_num)]
    
    list_lastrow = []
    
    if remain != 0: #맨 윗줄 하나 더 필요한 경우
        for k in range(remain):
            list_lastrow.append(1)
        
        if row_num%2 == 0: #행이 홀수개수 : 왼쪽부터 쌓으면 됨
            for k in range(0,w-remain):
                list_lastrow.append(0)
        else : #오른쪽부터 쌓으면 됨
            for k in range(0,w-remain):
                list_lastrow.insert(k,0) #k번째 요소로 0을 추가
        
        matrix.append(list_lastrow)
        row_num += 1

    

    #2. [num_row, num_column] 아래에 있는 1의 개수를 세어보자
    num_row = (num-1)//w 
    if num_row % 2 == 0: #index = 0,2,4 ...(정방향)
        num_column = (num-1) % w
    else : #index = 1,3,5,...
        num_column = w-1-((num-1)%w)
    
    answer = 0
    for i in range(num_row,row_num) : 
        if matrix[i][num_column] == 1:
            answer += 1

    return answer

print(solution(22,6,8))