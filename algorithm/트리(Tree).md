### 검색트리



> 트리와 이진트리

* 트리(Tree)

  : 계층적인 구조를 표현(조직도, 디렉토리와 서브디렉토리 구조, 가계도 등)

  - 노드(node)들과 노드들을 연결하는 링크(link)들로 구성됨.
  - 루트노드를 제외한 트리의 모든 노드들은 유일한 부모 노드를 가짐
  - 리프 (leaf)  노드: 자식이 없는 노드, 리프노드가 아닌 노드는 내부(internal)노드
  - 부트리(subtree) : 트리에서 어떤 한 노드와 그 노드의 자손들로 이루어진 트리

  

* 트리의 기본적 성질

  - 노드가 N개인 트리는 항상 N-1개의 링크(link)를 가진다.
  - 트리에서 루트에서 어떤 노드로 가는 경로는 유일하다. 또한 임의의 두 노드간의 경로도 유일하다

  

* 이진 트리(binary tree)

  - 이진 트리에서 각 노드는 최대 2개의 자식을 가진다.
  - 각각의 자식 노드는 자신이 부모의 왼쪽 자식인지 오른쪽 자식인지가 지정됨.



* Full and Complete Binary Tree

  ![image-20200412173745129](C:\Users\hyemin\AppData\Roaming\Typora\typora-user-images\image-20200412173745129.png)

  * 높이가 h인 full binary tree는 2^h-1개의 노드를 가진다.

  * 노드가 N개인 full 혹은 complete 이진 트리의 높이는 O(logN)이다.

    

* 이진트리의 표현

  - 연결구조(Linked Structure)로 표현

    ![image-20200412174450899](C:\Users\hyemin\AppData\Roaming\Typora\typora-user-images\image-20200412174450899.png)

    각 노드에 하나의 데이터 필드와 왼쪽자식, 오른쪽자식, 그리고 부모노드의 주소를 저장함.

    *(부모노드의 주소는 반드시 필요한 경우가 아니면 보통 생략)*



* 이진 트리의 순회 (traversal)

  : 이진 트리의 모든 노드를 방문하는 일

  중순위(inorder) , 선순위(preorder) , 후순위(postorder) 순회 / 레벨오더(level-order) 순회

  -> 루트를 언제 방문하느냐에 따라 나뉨



#### 중순위(inorder) 순회

- 왼쪽 > 루트 > 오른쪽

- x를 루트로 하는 트리를 inorder 순회. 시간복잡도 O(n)

  ~~~pseudocode
  INORDER-TREE-WALK(x)
  1	if x ≠ NIL
  2		then INORDER-TREE-WALK(left[x])
  3		print key[x]
  4		INORDER-TREE-WALK(right[x])
  ~~~

  

#### 선순위(preorder) 순회

* 루트 > 왼쪽 > 오른쪽

  ~~~pseudocode
  PREORDER-TREE-WALK(x)
  1	if x ≠ NIL
  2		then print key[x] 
  3		PREORDER-TREE-WALK(left[x])
  4		PREORDER-TREE-WALK(right[x])
  ~~~



#### 후순위(posetorder) 순회

* 왼쪽 > 오른쪽 > 루트

  ~~~pseudocode
  POSTORDER-TREE-WALK(x)
  1	if x ≠ NIL
  2		then PREORDER-TREE-WALK(left[x])
  3		PREORDER-TREE-WALK(right[x])
  4		print key[x] 
  ~~~

  

#### 레벨오더(level-order) 순회

* 레벨 순으로 방문, 동일 레벨에서는 왼쪽에서 오른쪽 순서로

* 큐(queue)를 이용하여 구현함

  ~~~ps
  LEVEL-ORDER-TREE-TRAVERSAL()
  	visit the root;
  	Q ← root;
  	while Q is not empty do
  		v ← dequeue(Q);
  		visit children of v;
  		enqueue children of v into Q;
  	end.
  end.
  ~~~

  