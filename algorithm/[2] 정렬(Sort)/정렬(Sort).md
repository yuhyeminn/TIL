### 정렬(Sort)

> 기본적인 정렬 알고리즘

* 선택정렬(Selection Sort)

  

* 버블정렬(Bubble Sort)



* 삽입정렬(Insertion Sort)



> 합병 정렬(Merge Sort)

#### 분할정복법(Divide and Conquer) - 합병정렬, 퀵정렬

- 순환(recursion)을 이용한 기법
- 분할 : 해결하고자 하는 문제를 작은 크기의 동일한 문제들로 분할
- 정복 : 각각의 작은 문제를 순환적으로 해결
- 합병 : 작은 문제의 해를 합하여 원래 문제에 대한 해를 구함



#### 합병 정렬(Merge Sort)

1. 데이터가 저장된 배열을 절반으로 나눔
2. 각각을 순환적으로 정렬
3. 정렬된 두 개의 배열을 합쳐 전체를 정렬

~~~pseudocode
mergeSort(A[], p, r){
	if(p < r) then {
		q <- (p+q)/2;			----> p와 q의 중간 지점 계산
		mergeSort(A,p,q);		----> 전반부 정렬
		mergeSort(A, q+1, r);	----> 후반부 정렬
		merge(A, p, q, r);		----> 합병
	}
}	
merge(A[], p, q, r){
		정렬되어 있는 두 배열 A[p...q]와 A[q+1...r]을 합하여
		정렬된 하나의 배열 A[p...r]을 만든다;
}
~~~

~~~java
void mergeSort(int data[], int p, int r){
    int q;
    if(p<r){
        q = (p + r)/2;
        mergeSort(data, p, q);
        mergeSort(data, q+1, r);
        merge(data, p, q, r);
    }
}

void merge(int data[], int p, int q, int r){
    int i=p, j=q+1, k=p;
    int temp[data.length()];
    while( i<= q && j <= r){
        if(data[i] <= data[j])
            temp[k++]=data[i++];
        else
            temp[k++]=data[j++];
    } 
    //두 배열 중 한 배열이 끝남
    //끝나지 않은 배열의 나머지 원소를 모두 가져옴
    while (i<=q)
        temp[k++]=data[i++];
    while (j<=r)
        temp[k++]=data[j++];
  
    for(int i=p; i<=r; i++)
        data[i] = temp[i];
}
~~~





> 퀵 정렬 (Quick Sort)

#### 퀵 정렬(Quick Sort)

- 기준(pivot)을 정하여 기준보다 작은수는 기준의 왼쪽에, 나머지는 오른쪽에 오도록 재배치(분할)

~~~pse
quickSort(A[], p, r)
{
	if(p<r) then {
		q = partition(A,p,r);
		quickSort(A, p, q-1);
		quickSort(A, q+1, r);
	}
}

partition(A[], p, r)
{
	배열 A[p...r]의 원소들을 A[r]을 기준으로 양쪽으로 재배치하고 A[r]이 자리한 위치를 return 한다;
	x ← A[r];
	i ← p-1;
	for j ← p to r-1
		if A[j] <= x then
			i← i+1;
			exchange A[i] and A[j];		
	exchange A[i+1] and A[r];
	return i+1;
}
~~~

~~~JAVA
//마지막 수를 pivot으로 삼음.
void quickSort(int arr[], int p, int r){
    int q;
    if( p < r ){
        q = partition(arr, p, r);
        quickSort(arr, p, q-1);
        quickSort(arr, q+1, r);
    }
}

int partition(int arr[], p, r){
    int x = arr[r];	//피봇
    int i = p-1;
    int tmp;
    for(int j = p; j<r-1;j++){
        if(arr[j] <= x){
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    tmp = arr[i+1];
    arr[i+1] = arr[r];
    arr[r] = tmp;
    
    return i+1;
}

~~~

* 최악의 경우

  * 항상 한쪽은 0개, 다른쪽은 n-1개로 분할되는 경우
  * 이미 정렬된 입력 데이터 ( 마지막 원소를 피봇으로 선택하는 경우)

* 최선의 경우

  - 항상 절반으로 분할되는 경우

* 평균시간복잡도

* Pivot의 선택

  - 첫번째 값이나 마지막 값을 피봇으로 선택.

    - 이미 정렬된 데이터, 거꾸로 정렬된 데이터가 최악의 경우.

      현실의 데이터는 랜덤하지 않으므로 정렬된 데이터가 입력으로 들어올 가능성 매우 높음

  - "Median of Three"

    - 첫번째 값과 마지막 값, 그리고 가운데 값 중에서 중간값(median)을 피봇으로 선택
    - 최악의 경우 시간복잡도가 달라지지는 않음

  - Randomized Quicksort

    - 피봇을 랜덤하게 선택
    - no worst case instance, but worst case execution
    - 평균 시간복잡도 





> 힙 정렬(Heap Sort)

#### 힙 정렬(Heap Sort)

- 최악의 경우에도 시간복잡도가 $O(nlog_2 n)$
- 추가 배열 불필요함(Sorts in place)

- 이진 힙(binary heap) 자료구조 사용

- Heap :  완전이진트리(complete binary tree)이면서 heap property를 만족해야 함.

  **max heap property : 부모는 자식보다 크거나 같다.

  **min heap property : 부모는 자식보다 작거나 같다.

  

- 기본연산 MAX-HEAPIFY

  트리의 전체 모양은 complete binary tree.

  sub tree들이 모두 heap이고 유일하게 루트만이 heap property를 만족하지 않는 경우

  --> 두 자식들 중 더 큰 쪽이 부모보다 크면 exchange

  ~~~pseudocode
  
  MAX-HEAPIFY-Recursion(A, i)
  {
  	if ther is no child of A[i]
  		return;
  	k ← index of the biggest child of i;
  	if A[i] >= A[k]
  		return;
  	exchange A[i] and A[k];
  	MAX-HEAPIFY(A,k);
  }
  
  MAX-HEAPIFY-Iterative(A, i)
  {
  	while A[i] has a child do
  		k ← index of the biggest child of i;
  		if A[i] >= A[k]
  			return;
  		exchange A[i] and A[k];
  		i = k;
  	end.
  }
  ~~~



* 힙 정렬 알고리즘 

  1. 정렬할 배열을 힙으로 만들기

     마지막 internal노드부터 시작. 즉, 배열의 (원소개수/2) 번째 원소부터 시작

     ~~~pseudocode
     BUILD-MAX-HEAP(A)
     1	heap-size[A] ← length[A]
     2	for i ← length[A]/2 downto 1
     3		do MAX-HEAPIFY(A,i)
     ~~~

  2. 힙에서 최대값(루트)을 가장 마지막 값과 바꾼다.

  3. 힙의 크기가 1 줄어든 것으로 간주한다. 즉, 가장 마지막 값(가장 큰 값)은 힙의 일부가 아닌 것으로 간주한다.

  4. 루트노드에 대해서 HEAPIFY(1)한다.

  5. 2~4번을 반복한다.

~~~pseudocode
HEAPSORT(A)
1.	BUILD-MAX-HEAP(A)
2.	for i ← heap_size downto 2 do
3.		exchange A[1] ↔ A[i]
4.		heap_size ← heap_size - 1
5.		MAX-HEAPIFY(A,1)
~~~





> 힙(heap)의 다른 응용 : 우선순위 큐(priority queue)

#### 우선순위 큐(priority queue)

* 최대 우선 순위 큐 (maximum priority queue)는 다음의 두 가지 연산을 지원하는 자료구조

  - INSERT(x) : 새로운 원소 x를 삽입

  - EXTRACT_MAX() : 최대값을 삭제하고 반환

* 최소 우선순위 큐 (minimum priority queue)는 EXTRACT-MAX 대신 EXTRACT-MIN을 지원하는 자료구조



* MAX HEAP을 이용한 최대 우선순위 큐

  - INSERT

    ~~~pseudocode
    MAX-HEAP-INSERT(A,KEY){
    	heap_size = heap_size+1;
    	A[heap_size] = key;
    	i = heap_size;
    	while (i>1 and A[PARENT(i)] < A[i]) {
    		exchange A[i] and A[PARENT(i)];
    		i = PARENT(i);
    	}
    }
    ~~~

  - EXTRACT_MAX()

    ~~~pseudocode
    HEAP-EXTRACT-MAX(A)
    1	if heap-size[A] < 1
    2		then error "heap underflow"
    3	max ← A[1]
    4	A[1] ← A[heap-size[A]]
    5	heap-size[A] <- heap-size[A]-1
    6	MAX-HEAPIFY(A,1)
    7	return max
    ~~~

    

> 정렬의 하한(lower bound)

* 선택, 삽입, 버블, 퀵 정렬은 최악의 경우 시간복잡도 $O(n^2)$
* 합병, 힙 정렬 최악의 경우 시간복잡도 $O(nlog_2n)$



#### Comparison Sort

- 시간복잡도가 $O(nlog_2n)$보다 나을 수 없음
- 데이터들간의 상대적 크기관계만을 이용한 정렬 알고리즘
- 데이터들간의 크기 관계가 정의되어 있으면 어떤 데이터에든 적용 가능(문자열, 알파벳, 사용자 정의 객체 등)
- 버블, 삽입, 합병, 퀵, 힙 정렬 등



#### Non-Comparison Sort

- 정렬할 데이터에 대한 사전지식을 이용 - 적용에 제한
- Bucket sort, Radix sort



#### 정렬문제의 하한(Lower bound)

* 입력된 데이터를 한번씩 다 보기위해서 최소 $O(n)$의 시간복잡도 필요
* 합병정렬과 힙정렬 알고리즘의 시간복잡도는 $O(nlog_2 n)$

* Decision Tree

  - leaf노드의 개수는 n! 개 --> 모든 순열(permutation)에 해당하므로 

  - 최악의 경우 시간복잡도는 트리의 높이

  - 트리의 높이
    $$
    height ≥ log_2n! = O(nlog_2n)
    $$

  

  **∴  어떠한 comparison sort도 시간복잡도가 O(nlog_2n)보다 나을 수 없음**



> 선형시간 정렬 알고리즘 (sorting in linear time)
>
> Non-Comparison Sort

#### Counting Sort

- n개의 정수를 정렬하라. 단 모든 정수는 0에서 k사이의 정수이다. (사전지식)

  ex ) n명의 학생들의 시험점수를 정렬하라. 단 모든 점수는 100이하의 양의 정수이다.

~~~pseudocode
COUNTING-SORT(A,B,k)
1	for i ← 0 to k
2		do C[i] ← 0
3	for j ← 1 to length[A]
4		do C[A[j]] ← C[A[j]] + 1
5	▷ C[i] now contains the number of elements equal to i.
6	for i ← 1 to k
7		do C[i] ← C[i]+C[i-1]
8	▷ C[i] now contains the number of elements less than or equal to i.
9	for j ← length[A] downto 1
10		do B[C[A[j]]] ← A[j]
11			C[A[j]] ← C[A[j]]-1
~~~

* 시간 복잡도 : $O(n+k)$ 또는 $O(n)$ if k=$O(n)$

* k가 클 경우 비실용적.

* Stable 정렬 알고리즘

  - 입력에동일한 값이 있을 때 입력에 먼저 나오는 값이 출력에서도 먼저 나옴
  - Counting 정렬은 stable함

  

#### Radix Sort

- n개의 d자리 정수들
- 가장 낮은 자리수부터 정렬함
- 각 자릿수를 Counting sort 이용하여 정렬

![image-20200407205931442](https://user-images.githubusercontent.com/58774719/81820978-47184180-956c-11ea-8454-b728ef31d4c7.png)

 ~~~pseudocode
RADIX-SORT(A,d)
1	for i ← 1 to d
2		do use a stable sort to sort array A on digit i
 ~~~

* 시간 복잡도 : $O(d(n+k))$



#### 정렬 알고리즘의 시간복잡도

![image-20200407212121701](https://user-images.githubusercontent.com/58774719/81820837-0f10fe80-956c-11ea-9413-1c931c118ba8.png)