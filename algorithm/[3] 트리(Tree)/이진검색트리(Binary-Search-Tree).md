### 이진검색트리 (Binary Search Tree)



#### Dynamic set

* 여러개의 키(key)를 저장

* 다음과 같은 연산들을 지원하는 자료구조

  - INSERT - 새로운 키의 삽입
  - SEARCH - 키 탐색
  - DELETE - 키의 삭제

  

#### 검색 트리

* Dynamic set을 트리의 형태로 구현
* 일반적으로 SEARCH, INSERT, DELETE 연산이 트리의 높이(height)에 비례하는 시간복잡도를 가짐
* 이진 검색 트리(Binary Search Tree) , 레드-블랙 트리(red-black tree) , B-트리 등



------



#### 이진 검색 트리 (BST - Binary Search Tree)

> - 이진트리이면서 각 노드에 하나의 키를 저장하고 있음
>
> - 각 노드 v에 대해서 그 노드의 왼쪽 부트리(subtree)에 있는 키들은 key[v]보다 작거나 같고, 오른쪽 부트리에 있는 값은 크거나 같음.



* **SEARCH**

  - 찾는 값이 현재 노드보다 작다면 왼쪽 탐색. 크다면 오른쪽 탐색

  - 시간 복잡도 : O(h) -> h는 트리의 높이

    ~~~pseudocode
    TREE-SEARCH(x,k)
    1	if x = NIL or k = key[x]
    2		then return x
    3	if k < key[x]
    4		then return TREE-SEARCH(left[x],k)
    5		else return TREE-SEARCH(right[x],k)
    
    ITERATIVE-TREE-SEARCH(x,k)
    1	while x ≠ NIL and k ≠ key[x]
    2		do if k < key[x]
    3			then x ← left[x]
    4			else x ← right[x]
    5	return x
    ~~~

  - *최소값*

    항상 가장 왼쪽 노드에 존재함. 시간복잡도 O(h)

    ~~~pseudocode
    TREE-MINIMUM(x)
    1	while left[x] ≠ NIL
    2		do x ← left[x]
    3	return x
    ~~~

  - *Successor* 

    노드 x의 successor란 key[x]보다 크면서 가장 작은 키를 가진 노드를 말함 

    (모든 키들이 서로 다르다고 가정)

    * x의 오른쪽 부트리가 존재할 경우, 오른쪽 부트리의 최소값이 successor
    * 오른쪽 부트리 존재하지 않을 경우, 부모를 따라 루트까지 올라가면서 첫번째로 부모노드의 왼쪽 자식이 되는 경우 해당 부모노드(y노드)가 successor
    * 위의 y노드가 존재하지 않을 경우 successor가 존재하지 않음. (즉, x가 최대값)

    ~~~pseudocode
    TREE-SUCCESSOR(x)
    1	if right[x] ≠ NIL
    2		then return TREE-MINIMUM(right[x])
    3	y ← p[x]
    4	while y ≠ NIL and x = right[y]
    5		do x ← y
    6		   y ← p[y]
    7	return y
    ~~~

  - 노드 x의 Predecessor : key[x] 보다 작으면서 가장 큰 노드. Successor와 반대

  

* **INSERT**

  - 두개의 포인터 x, y를 사용함
  - 시간복잡도 : O(h)

  ~~~pseudocode
  TREE-INSERT(T,z)
  1	y ← NIL
  2	X ← root[T]
  3	while x ≠ NIL
  4		do y ← x
  5			if key[z] < key[x]
  6				then x ← left[x]
  7				else x ← right[x]
  8	p[z] ← y
  9	if y = NIL
  10		then root[T] ← z
  11		else if key[z] < key[y]
  12				then left[y] ← z
  13				else right[y] ← z
  ~~~



* **DELETE **

  - 삭제할 노드 : x 노드
    - x노드에 자식 노드가 없을 경우 :  그냥 삭제
    - x노드에 자식 노드가 1개인 경우 : x노드의 자식노드를 x노드 위치로 옮김
    - x노드에 자식 노드가 2개인 경우 : x 노드의 successor를 x노드 위치로 옮김
  - 시간복잡도 : O(h)

  ~~~pseudocode
  TREE-DELETE(T,z)
  1	if left[x] = NIL or right[z] = NIL
  2		then y ← z
  3		else y ← TREE-SUCCESSOR(z)
  4	if left[y] ≠ NIL
  5		then x ← left[y]
  6		else x ← right[y]
  7	if x ≠ NIL
  8		then p[x] ← p[y]
  9	if p[y] = NIL
  10		then root[T] ← x
  11		else if y = left[p[y]]
  12				then left[p[y]] ← x
  13				else right[p[y]] ← x
  14	if y ≠ z
  15		then key[z] ← key[y]
  16			 copy y's satellite data into z
  17	return y
  ~~~

  

* 이진 검색 트리 (BST)
  - 각종 연산의 시간복잡도 : O(h)
  - 최악의 경우 트리의 높이 h = O(n)
  - 균형잡힌(balanced) 트리
    - 레드-블랙 트리 등
    - 키의 삽입이나 삭제 시 추가로 트리의 균형을 잡아줌으로써 높이를 O(log_2n)으로 유지