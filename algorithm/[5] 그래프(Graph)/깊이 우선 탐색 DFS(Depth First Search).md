### 깊이 우선 탐색 DFS(Depth First Search)



#### DFS(Depth First Search)

>  * 루트노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색함
>  * '맹목적인 탐색'을 하고자 할 때 사용할 수 있는 탐색 기법
>  * 너비우선탐색보다 좀 더 간단함. 대신 조금 더 느림
>  * 자기 자신을 호출하는 순환 알고리즘 형태로 많이 사용
>  * 스택(Stack)원리를 이용하여 구현 - 명시적인 스택 사용



#### 노드 방문 순서

![img](https://gmlwjd9405.github.io/images/algorithm-dfs-vs-bfs/dfs-example.png)





#### DFS 구현

- 구현방법 2가지
  - 순환 호출 이용하여 구현
  - 명시적인 스택사용하여 구현
    - 명시적인 스택 사용하여 방문한 정점들을 스택에 저장하였다가 다시꺼내어 작업함.
- 순환 호출을 이용한 DFS 의사코드

~~~pseudocode
void DFS(Node root) {
  if (root == null) return;
  // 1. root 노드 방문
  visit(root);
  root.visited = true; // 1-1. 방문한 노드를 표시
  // 2. root 노드와 인접한 정점을 모두 방문
  for each (Node n in root.adjacent) {
    if (n.visited == false) { // 4. 방문하지 않은 정점을 찾는다.
      search(n); // 3. root 노드와 인접한 정점 정점을 시작 정점으로 DFS를 시작
    }
  }
}
~~~

- 시간 복잡도 
  - 그래프 (정점의 수 : V, 간선의 수 : E) 
    - 인접 리스트 : $O(N+E)$
    - 인접 행렬 : $O(N^2)$
  - 그래프 내에 적은 숫자의 간선만을 가지는 희소 그래프의 경우 인접 행렬보다 인접 리스트를 사용하는 것이 유리함.



#### Java 구현

~~~java
import java.util.Iterator;
import java.util.LinkedList;

/* 인접리스트 이용 */
public class DFS {
	private int V;						//노드의 개수
	private LinkedList<Integer> adj[];	//인접리스트
	
	public DFS(int v){
		V = v;
		adj = new LinkedList[v];
		//인접리스트 초기화
		for(int i=0; i<v; i++) {
			adj[i] = new LinkedList();
		}
	}
	
	/* 노드 연결 메소드 */
	public void addEdge(int v, int w) {adj[v].add(w);}
	
	public void dfsUtil(int v, boolean visited[]) {
		//현재 노드를 방문한 것으로 표시하고 값을 출력함
		 visited[v] = true;
		 System.out.print(v + " ");
		 
		// 방문 노드와 인접한 모든 노드를 가져옴
		Iterator<Integer> iter = adj[v].listIterator();
		while(iter.hasNext()) {
			int n = iter.next();
			//방문하지 않은 노드면 해당 노드를 다시 시작 노드로 하여 dfsUtil호출(재귀)
			if(!visited[n]) {
				dfsUtil(n, visited);
			}
		}
					
	}
	/* 주어진 노드를 시작 노드로 하여 dfs탐색 */
	public void dfs(int v) {
		// 노드의 방문 여부 판단
		boolean visited[] = new boolean[V];
		
		// v를 시작 노드로 dfsUtil 순환 호출
		dfsUtil(v, visited);
	}
	
	/* dfs탐색*/
	public void dfs() {
		// 노드의 방문 여부 판단
		boolean visited[] = new boolean[V];
		
		// 비연결형 그래프의 경우 모든 정점을 하나씩 방문
		for(int i=0;i<V;i++) {
			if(visited[i]==false) {
				dfsUtil(i, visited);
			}
		}
	}
	
	public static void main(String[] args) {
		DFS d = new DFS(4);
		
		d.addEdge(0, 1);
		d.addEdge(0, 2);
		d.addEdge(1, 2);
		d.addEdge(2, 0);
		d.addEdge(2, 3);
		d.addEdge(3, 3);
		
		// System.out.println(Arrays.toString(d.adj));
		
		d.dfs(2);	//주어진 노드를 시작 노드로 dfs탐색
		d.dfs();	//비연결형 그래프의 경우 dfs탐색
	}
}
~~~



[참고 및 이미지 출처] : https://gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html