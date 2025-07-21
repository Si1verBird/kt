def solution(array):
    length = len(array)
    j = 0
    
    # 1. 오름차순 정렬
    while j < length : 
        for i in range(0,length-1):
            if array[i] > array[i+1]:
                array[i], array[i+1] = array[i+1],array[i]
        j += 1
        
    center_num = int((length+1) / 2) -1
    answer = array[center_num]
    return answer

solution([5,4,3,1,2])