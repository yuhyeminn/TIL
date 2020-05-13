### 레드-블랙 트리 (Red-Black Tree)



> 레드-블랙 트리
>
> * 이진 탐색 트리의 일종
> * 균형 잡힌 트리 : 높이가 $O(log_2n)$
> * SEARCH, INSERT, DELETE 연산 최악의 경우에도 $O(log_2n)$ 



![레드-블랙 트리 - 위키백과, 우리 모두의 백과사전](https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Red-black_tree_example.svg/500px-Red-black_tree_example.svg.png)

* 각 노드는 하나의 키(key), 왼쪽자식(left), 오른쪽 자식(right), 그리고 부모노드(p)의 주소를 저장
* 자식 노드가 존재하지 않을 경우 NIL 노드라고 부르는 특수한 노드가 있다고 가정함
* 따라서 모든 리프노드는 NIL노드
* 루트의 부모도 NIL노드라고 가정함
* 노드들은 내부노드와 NIL노드로 분류함



#### 레드-블랙 트리 정의

1. 각 노드는 red 혹은 black
2. 루트노드 black
3. 모든 리프노드(NIL노드)는 black
4. red 노드의 자식노드는 전부 black ( red 노드는 연속되어 등장하지 않음)
5. 모든 노드에 대해서 그 노드로부터 자손인 리프노드에 이르는 모든 경로에는 동일한 개수의 black 노드가 존재함



#### 레드-블랙 트리 높이

* 노드 x의 높이 h(x)는 자신으로부터 리프노드까지의 가장 긴 경로에 포함된 에지의 개수
* 노드 x의 블랙-높이 bh(x)는 x로부터 리프노드까지의 경로상의 블랙노드 개수 ( 노드 x 자신은 불포함)

- 높이가 h인 노드의 블랙-높이는 bh ≥ h/2
- 노드 x를 루트로 하는 임의의 부트리는 적어도 $2^{bh(x)} - 1$개의 내부 노드를 포함
- **n개의 내부노드를 가지는 레드-블랙트리의 높이는 $2log_2(n+1)$ 이하**



#### Left and Right Rotation

​	시간 복잡도 $O(1)$

​	이진탐색 트리의 특성을 유지함

![image-20200415215405813](https://user-images.githubusercontent.com/58774719/81821528-e63d3900-956c-11ea-9d49-a67810c219de.png)



* Left Rotation

  * y = right[x] ≠ NIL , 루트 노드의 부모도 NIL이라고 가정

  ~~~pseudocode
  LEFT-ROTATE(T,x)
  1	y ← right[x]					▷ Set y
  2	right[x] ← left[y]				▷ Turn y's left subtree into x's right subtree
  3	p[left[y]] ← x
  4	p[y] ← p[x]					▷ Link x's parent to y
  5	if p[x] = nil[T]
  6		then root[T] ← y
  7		else if x = left[p[x]]
  8			then left[p[x]] ← y
  9			else right[p[x]] ← y
  10	left[y] ← x
  11	p[x] ← y
  ~~~

  

#### INSERT

* 보통의 BST에서처럼 노드를 INSERT함.
* 새로운 노드 Z를 red노드로 지정
* RB-INSERT-FIXUP을 호출

~~~pseudocode
RB-INSERT(T,z)
1	y ← nil[T]
2	X ← root[T]
3	while x ≠ nil[T]
4		do y ← x
5			if key[z] < key[x]
6				then x ← left[x]
7				else x ← right[x]
8	p[z] ← y
9	if y = nil[T]
10		then root[T] ← z
11		else if key[z] < key[y]
12				then left[y] ← z
13				else right[y] ← z
14	left[z] ← nil[T]
15	right[z] ← nil[T]
16	color[z] ← RED
17	RB-INSERT-FIXUP(T,z)
~~~

* 레드-블랙 트리 조건 위반 

  - root노드 = black : 만약 z가 루트노드라면 루트노드가 red가 되므로 위반
  - red노드 연속 될 수 없음 : z의 부모 p[z]가 red 이면 위반

  

#### RB-INSERT-FIXUP

* Loop Invariant

  - z 는 red 노드

  - 오직 하나의 위반만이 존재 

    : z가 루트노드이면서 red이거나 / z와 그 부모 p[z]가 둘 다 red이거나

* 종료 조건

  - 부모노드 p[z]가 black이 되면 종료. z가 루트이면 black으로 바꿔주고 종료

* CASE 1, 2, 3 : p[z]가 p[p[z]]의 왼쪽 자식인 경우

  CASE 4, 5, 6 : p[z]가 p[p[z]]의 오른쪽 자식인 경우

![RB-INSERT-FIXUP](https://user-images.githubusercontent.com/58774719/81821645-0b31ac00-956d-11ea-8378-b626ead4d631.PNG)



→ INSERT의 시간복잡도 : $O(log_2n)$



#### DELETE

* 보통의 BST에서처럼 DELETE함
* 실제로 삭제된 노드 y가 red라면 종료
* y가 black이라면 RB-DELETE-FIXUP 호출

~~~pseudocode
RB-DELETE(T,z)
1	if left[z] = nil[T] or right[z] = nil[T]
2		then y ← z
3		else y ← TREE-SUCCESSOR(z)
4	if left[y] ≠ nil[T]
5		then x ← left[y]
6		else x ← right[y]
7	p[x] ← p[y]
8	if p[y] = nil[T]
9		then root[T] ← x
10		else if y = left[p[y]]
11				then left[p[y]] ← x
12				else right[p[y]] ← x
13	if y ≠ z
14		then key[z] ← key[y]
15			copy y's satellite data into z
16	if color[y] = BLACK
17		then RB-DELETE-FIXUP(T,x)
18	return y
~~~

* 레드-블랙 트리 조건 위반 

  - root노드 = black : y가 루트였고 x가 red인 경우 위반

  - red노드 연속 될 수 없음 : p[y]와 x가 모두 red인 경우 위반

  - 리프노드에 이르는 모든 경로에는 동일한 개수의 black 노드 

    : 원래 y를 포함했던 모든 경로는 이제 black 노드 하나가 부족함

    - 노드 x에 "extra black"을 부여해서 일단 조건 만족
    - 노드 x는 "double black" 혹은 "red & black"



#### RB-DELETE-FIXUP

* 아이디어 
  - extra black을 트리의 위쪽으로 올려보냄
  - x가 red & black 상태가 되면 그냥 black노드로 만들고 끝냄
  - x가 루트가 되면 extra black을 제거

* Loop Invariant
  - x는 루트가 아닌 double-black 노드
  - w는 x의 형제노드
  - w는 NIL노드가 될 수 없음 

- case 1, 2 , 3, 4 : x 가 부모의 왼쪽 자식노드

  case 5, 6, 7, 8 : x가 부모의 오른쪽 자식 노드

  - case 1 : w가 red인 경우
    - w의 자식들은 black
    - w를 black으로 , p[x]를 red로
    - p[x]에 대해서 left-rotation 적용
    - x의 새로운 형제 노드는 원래 w의 자식 노드라 black노드임
  - case 2 : w는 black, w의 자식들도 black
    - x의 extra-black을 뺏고, w를 red로 변경
    - p[x]에게 뺏은 extra-black을 줌
    - p[x] 가 원래 black이었을 경우 p[x]를 새로운 x로 해서 계속 진행
    - 만약 case1에서 이 경우에 도달했다면 p[x]는 red였고, 새로운 x는 red&black이 되므로 종료
  - case 3 : w는 black, w의 왼쪽 자식이 red
    - w를 red로, w의 왼쪽 자식노드를 black으로 변경
    - w에 대해서 right-rotation적용
    - x의 새로운 형제 w는 오른쪽 자식이 red
  - case 4 : w는 black, w의 오른쪽 자식이 red
    - w의 색을 현재 p[x]의 색으로
    - p[x]를 black으로, w의 오른쪽 자식을 black으로
    - p[x]에 대해서 left-rotation 적용
    - x의 extra-black 을 제거하고 종료

![RB-DELETE-FIXUP](https://user-images.githubusercontent.com/58774719/81821575-f7864580-956c-11ea-97a1-07e37dc531f5.PNG)



- 시간복잡도 $O(log_2n)$
