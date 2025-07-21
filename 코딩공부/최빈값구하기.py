def find_max(dictionary):
    key_list = list(dictionary.keys())
    same = False

    # for i in dictionary : #for문 쓰면 key 를 반환 -> key를 리스트에 저장
    #     key_list.append(i)
    
    finding_result = key_list[0] #첫번째 키로 임시값 설정
    
    for i in range(1,len(key_list)):
        if int(dictionary[finding_result]) < int(dictionary[key_list[i]]):
            finding_result = key_list[i]
        
        #겹치는 최빈값이 있는 경우 if_same 에 해당 값을 넣어놓고, 마지막에 비교해서 이거면 -1
        #혹은 딕셔너리에서 최종 finding_
        elif int(dictionary[finding_result]) == int(dictionary[key_list[i]]):
            finding_result_hit = finding_result
            same = True 
    
    if same : 
        if finding_result == finding_result_hit : #겹치기
            finding_result = -1
            
       
#     dictionary2 = dictionary.copy()
#     how_many = dictionary2[finding_result]
#     del dictionary2[finding_result]
#     value_list = dictionary2.values()
    
#     for i in range(0,len(dictionary2)):
#         if list(dictionary2.values)[i] == how_many :
#             finding_result = -1
    
    return finding_result
    

def solution(array):
    dict = {}
    # 숫자와 나온 횟수를 dict에 저장 
    for i in range(0, len(array)):
        if array[i] not in dict:
            dict[array[i]] = 1
        else : #dict에 있을때
            dict[array[i]] += 1
    
    answer = find_max(dict)
    return answer
