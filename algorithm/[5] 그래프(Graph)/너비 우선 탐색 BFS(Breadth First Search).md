### 너비 우선 탐색 BFS(Breadth First Search)



#### BFS(Breadth First Search)

> - 루트노드에서 시작해서 인접한 노드를 먼저 탐색하는 알고리즘
>
>  * '맹목적인 탐색'을 하고자 할 때 사용할 수 있는 탐색 기법
>  * '최단 경로'를 찾아준다는 점에서 최단 길이를 보장해야 할 때 많이 사용함
>  * 큐(Queue)를 사용하여 구현



#### 노드 방문 순서

1. $L_0$ : {s}, 여기서 s는 출발 노드

2. $L_1$ : $L_0$의 모든 이웃 노드들

3. $L_2$ : $L_1$의 이웃 노드들 중 $L_0$에 속하지 않는 노드들

   ...

4. $L_i$ : $L_{i-1}$의 이웃 노드들 중 $L_{i-2}$에 속하지 않는 노드들



#### Queue를 이용한 BFS

1. check the start node
   ** check : 이미 방문된 노드라는 표시
2. insert the start node into queue
3. while the queue is not emty do 
       remove a node v from queue;
       for each unchecked neighbour w of v do
       check and insert w into the queue;

~~~pseudocode
BFS(G,s)	/* 그래프 G와 출발 노드 s */
  Q ← ∅;
  Enqueue(Q,s);
  while Q≠∅ do
  	u ← Dequeue(Q)
    for each v adjacent to u do
    	if v is unvisited then
    		mark v as visited;
    		Enqueue(Q,v);
    	end.
    end.
  end.
~~~



#### BFS와 최단 경로

- s에서 $L_i$에 속한 노드까지의 최단 경로의 길이는 i

    ** 경로의 길이는 경로에 속한 간선의 개수를 의미

- BFS를 하면서 각 노드에 대해서 최단 경로의 길이를 구할 수 있음.

- 입력 : 방향 혹은 무방향 그래프 G=(V,E) , 출발노드 s ∈ V
- 출력 : 모든 노드 v에 대해서
  - d[v] = s로부터 v까지의 최단 경로의 길이(간선의 개수)
  - π[v] = s로부터 v까지의 최단경로상에서 v의 직전 노드(predecessor)

~~~pseudocode
BFS(G,s)	
  Q ← ∅;
  for each node u do
  	d[u] ← -1;
    π[u] ← null;
  end.
  d[s] ← 0;						/* distance from s to s is 0*/
  π[s] ← null;					/* no predecessor of s */
  Enqueue(Q,s);
  while Q≠∅ do
  	u ← Dequeue(Q)
    for each v adjacent to u do
    	if (d[v] == -1) then	/* if v is unvisited then*/
    		mark v as visited;
    		d[v] ← d[u]+1;		/* distance to v */
    		π[v] ← u;			/* u is the predecessor of v */
    		Enqueue(Q,v);
    end.
    
  end.
  /* 보통 모든 노드들에 대해서 d[v]를 -1로 초기화 해두고, -1이면 unvisited, 아니면 visited로 판단*/
  PRINT-PATH(G,s,v)
    if v=s then
    	print s;
    else if π[v]=null then
    	*print "no path from s to v exists";
    else 
    	PRINT-PATH(G,s,π[v]);
    	print v;
~~~

- 인접 리스트로 구현할 경우 시간복잡도 $O(n+m)$

* 그래프가 disconnected이거나 혹은 방향 그래프라면 BFS에 의해 모든 노드가 방문되지 않을 수 있음

  - BFS를 반복하여 모든 노드 방문

    ~~~pseudocode
    BFS-ALL( G )
    {
    	while there exists unvisited node v
    		BFS(G, v);
    }
    ~~~

    

#### BFS 트리

- 각 노드 v와  π[v]를 연결하는 간선으로 구성된 트리
- BFS트리에서 s에서 v까지의 경로는 s에서 v까지 가는 최단경로
- 어떤 간선도 2개의 layer를 건너가지 않음.



#### Java 구현

~~~java
import java.util.Iterator;
import java.util.LinkedList;

/* 인접리스트 이용 */
public class BFS {
	private int V;						//노드의 개수
	private LinkedList<Integer> adj[];	//인접리스트
	
	public BFS(int v){
		V = v;
		adj = new LinkedList[v];
		//인접리스트 초기화
		for(int i=0; i<v; i++) {
			adj[i] = new LinkedList();
		}
	}
	
	/* 노드 연결 메소드 */
	public void addEdge(int v, int w) {adj[v].add(w);}
	
	/** s를 시작 노드으로 한 BFS로 탐색하면서 탐색한 노드들을 출력 */
	public void bfs(int s) {
		// 노드 방문 여부 판단 배열
		boolean visited[] = new boolean[V];
		// 큐 생성
		LinkedList<Integer> queue = new LinkedList<Integer>();
		
		//현재 노드를 방문한 것으로 표시하고 큐에 삽입함
		visited[s] = true;
		queue.add(s);
		
		
		while(!queue.isEmpty()) {
			// 방문한 노드를 큐에서 추출하고 값을 출력함
			s = queue.poll();
			System.out.print(s + " ");
			
			// 방문 노드와 인접한 모든 노드를 가져옴
			Iterator<Integer> iter = adj[s].listIterator();
			while(iter.hasNext()) {
				int n = iter.next();
				if(!visited[n]) {
					visited[n] = true;
					queue.add(n);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		BFS b = new BFS(4);
		
		b.addEdge(0, 1);
		b.addEdge(0, 2);
		b.addEdge(1, 2);
		b.addEdge(2, 0);
		b.addEdge(2, 3);
		b.addEdge(3, 3);
		
		//System.out.println(Arrays.toString(b.adj));
		
		b.bfs(2);	//2 0 3 1
	}
}
~~~

