### 순환(Recursion)

> 순환의 개념과 기본 예제 1

* 무한루프에 빠지지 않기 위한 요구사항
  * base case : 순환되지 않고 종료되는 case. 적어도 하나의 base case가 있어야 함.
  * recursive case : recursion을 반복하다보면 결국 base case로 수렴해야 함.
  
  
  
* Factorial : n!

  ```java
  public static int factorial(int n)
  {
  	if(n==0)
  		return 1;
  	else
  		reutrn n*factorial(n-1);
  }
  ```

  

* Fibonacci Number

  ```java
  public int fibonacci(int n){
  	if (n<2)
  		return n;
  	else 
  		return fibonacci(n-1) + fibonacci(n-2);
  }
  ```

  

* 최대 공약수 : Euclid Method 

  *m>=n인 두 양의 정수 m과 n에 대해서 m이 n의 배수이면 gcd(m,n) = n이고, 그렇지 않으면 gcd(m,n) = gcd(n, m%n)이다.*

  ```java
  public static double gcd(int m, int n){
  	if(m<n){
  		int tmp=m; m=n; n=tmp;	// swap m and n
  	}
  	if(m%n==0)
  		return n;
  	else
  		return m;
  }
  // 좀 더 간단한 버전
  public static int gcd2(int p, int q){
  	if(q==0)
  		return p;
  	else
  		return gcd2(q, p%q);
  }
  ```

  

>  순환의 개념과 기본 예제 2

* 문자열 길이 계산

  ~~~java
  public static int length(String str){
      if(str.equals(""))
          retrun 0;
      else
          return 1+length(str.substring(1));
  }
  ~~~



- 모든 순환 함수는 반복문으로 변경 가능. 즉, 모든 반복문은 recusrion으로 표현 가능함.
- 순환함수는 복잡한 알고리즘을 단순하고 알기쉽게 표현하는 것을 가능하게 함
- 하지만 함수 호출에 따른 오버헤드가 있음. (매개변수 전달, 액티베이션 프레임 생성 등)



> 순환의 개념과 기본 예제 3

* 순환함수를 작성 할 때에는 매개변수를 명시화하는 것이 좋음.

  * 순차 탐색

    ~~~java
    int search(int[] data, int begint, int end, int target){
        if(begin>end)
            return -1;
        else if( target == data[begin])
            return begin;
        else
            return search(data, begin+1, end, target)
    }
    ~~~

  * 이진 탐색

    ~~~java
    public static int binarySearch(String[] items, String target,
                                   int begin, int end) {
        if(begin > end)
            return -1;
        else {
            int middle = (begin+end)/2;
            int compResult = target.compateTo(items[middle]);
            if(compResult == 0)
                return middle;
            else if(compResult<0)
                return binarySearch(items, target, begin, middle-1);
            else
                return binarySearch(items, target, middle+1, end);
        }
        
    }
    ~~~

    

> Recusion의 응용 - 미로찾기 1

* 알고리즘

~~~pseudocode
boolean findPath(x,y)
	if (x,y) is either on the wall or a visited cell
		return false;
	else if (x,y) is the exit
		return true;
	else
		mark (x,y) as a visited cell;
		for each neighbouring cell(x',y') of (x,y) do
			if findPath(x',y')
				return true;
		return false;
~~~

* 예제

~~~java
public class Maze{
    private static int N = 8;
    private static int[][] maze = {
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    };
    private static final int PATHWAY = 0;	// 지나갈 수 있는 길
    private static final int WALL = 1;		// 벽
    private static final int BLOCKED = 2;	// 지나간 길. 출구까지 경로가 없는 길
    private static final int PATH = 3;		// 지나간 길. 출구까지 경로가 있는 길
    
    public static boolean findMazePath(int x, int y){
        if(x<0 || y<0 || x>=N || y>=N)	// 좌표 유효성 체크
            return false;
        else if (maze[x][y] != PATHWAY)
            reutrn false;
        else if (x==N-1 && y==N-1){		// 출구에 도착한 경우
            maze[x][y] = PATH;
            return true;
        }
        else{
            maze[x][y] = PATH;
            if(findMazePath(x-1,y) || findMazePath(x,y+1) 
              || findMazePath(x+1,y) || findMazePath(x,y-1)){
                return true;
            }
            maze[x][y] = BLOCKED;
            return false;
        }
    }
    
    public static void main(String[] args){
        printMaze();
        findMazePath(0,0);
    }
}
~~~



> Recursion의 응용 : Counting Cells in a Blob

* Counting Cells in a Blob

  * background pixel 과 image pixel. 서로 연결된 image pixel들의 집합을 blob이라고 함. 

    blob은 상하좌우 및 대각방향으로도 연결된 것으로 간주함.

  * 입력 : N*N 크기의 2차원 그리드, 하나의 좌표(x,y)
  * 출력 : 픽셀 (x,y)가 포함된 blob의 크기. (x,y)가 어떤 blob에도 속하지 않는 경우 0

* 알고리즘

~~~pseudocode
if the pixel (x,y) is outside the grid
	the result is 0;
else if pixel (x,y) is not an image pixel or already counted 
	the result is 0;
else
	set the colour of the pixel (x,y) to a red colour;
	the result is 1 plus the number of cells in each piece of 
	the blob that includes a nearest neighbour;
~~~

* 예제

~~~java
private static int BACKGROUND = 0;
private static int IMAGE = 1;
private static int ALREADY_COUNTED = 2;
public int countCells(int x, int y){
    if(x<0 || x>=N || y<0 || y>=N)
        return 0;
    else if(grid[x][y] != IMAGE)
        return 0;
    else {
        grid[x][y] = ALREADY_COUNTED;
        return 1 + countCells(x-1, y+1) + countCellse(x, y+1)
            + countCells(x+1,y+1) + countCells(x-1,y)
            + countCells(x+1,y) + countCells(x-1,y-1)
            + countCells(x,y-1) + countCells(x+1,y-1)
    }
}
~~~



> Recursion의 응용 : N-Queens problem

* N-Queens

  * N*N 체스보드. N개의 말

  * 상태공간트리 : 찾는 해를 포함하는 트리. 해가 존재한다면 그것은 반드시 트리의 어떤 한 노드에 해당함 --> 트리를 체계적으로 탐색하면 해를 구할 수 있음.

  * 되추적 기법(Backtracking) : 상태공간 트리를 깊이 우선 방식으로 탐색하여 해를 찾는 알고리즘

    

~~~java
int [] colse = new int [N+1];	
boolean queens(int level)
{
	if (!promising(level))
		return false;
	else if (level==N){
        for(int i=1;i<=N;i++)
            System.out.println("(" + i + ", " + cols[i] + ")");
        return true;
    }
	for(int i=1; i<=N; i++) {
		cols[level+1] = i;
		if(queens(level+1))
			return true;
	}
	return false;
}

boolean promising(int level)
{
	for(int i=1; i<level; i++){
		if(cols[i]==cols[level])
			return false;
		else if (level-i == Math.abs(cols[level]-cols[i]))
			return false;
	}
	return true;
}
~~~



> 멱집합 (powerset)

* 집합의 모든 부분집합
* {a, b, c, d, e, f}의 모든 부분집합을 나열하려면 
  1. a를 제외한 {b, c, d, e, f}의 모든 부분집합들을 나열하고
  2. {b, c, d, e, f}의 모든 부분집합에 {a}를 추가한 집합들을 나열한다.
* 상태공간트리의 모든 노드 탐색
* 알고리즘

~~~pseudocode
powerSet(P, S)
if S is an empty set
	print P;
else
	let t be the first elemnet of S;
	powerSet(P, S-{t});
	pwoerSet(PU{t}, S-{t})
~~~

~~~java
private static char data[] = {'a','b','c','d','e','f'};
private static int n=data.length;
private static boolean [] include = new boolean[n];

public static void powerSet(int k){
    if(k==n){		
        for(int i=0;i<n;i++){
            if(include[i]) System.out.print(data[i]+ " ");
        }
        System.out.println();
        return;
    }
    include[k] = false;	
    powerSet(k+1);
    include[k] = true;
    powerSet(k+1);
}
~~~

