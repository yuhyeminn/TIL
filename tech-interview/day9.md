# 💣day9 (2021/01/26)

<br>

## ✨ HTTP 2.0

>https://goldfishhead.tistory.com/26
>
>https://www.whatap.io/ko/blog/38/
>
>https://ijbgo.tistory.com/26
>
>https://www.popit.kr/%EB%82%98%EB%A7%8C-%EB%AA%A8%EB%A5%B4%EA%B3%A0-%EC%9E%88%EB%8D%98-http2/

<br>

### HTTP/1.1 

- HTTP/1.1은 기본적으로 Connection 당 하나의 요청을 처리하도록 설계

- HTTP/1.1 성능 개선을 위해 파이프라이닝 기술 도입

  - 하나의 커넥션에서 한 번에 순차적인 여러 요청을 연속적으로 하고, 그 순서에 맞춰 응답을 받는 방식
  - 먼저 받은 요청이 끝나지 않으면 그 뒤에 있는 요청의 처리가 먼저 끝났어도 앞의 요청이 끝날 때 까지 기다려야 함

  - -> **HOL Blocking 문제 발생 **

- 요청을 병렬로 처리하기 위해 6-8개 정도의 여러 커넥션을 이용해 데이터를 가져오는 방식으로 성능을 개선함

### HTTP/2.0 

> - 스트림 : 구성된 연결 내에서 전달되는 바이트의 양뱡향 흐름이며, 하나 이상의 메시지가 전달될 수 있음
>
> - 메시지 : 논리적 요청 또는 응답 메시지에 매핑되는 프레임의 전체 시퀀스
> - 프레임 : HTTP/2.0에서 통신의 최소 단위이며 각 최소 단위에는 하나의 프레임 헤더가 포함됨

![http_2](https://www.whatap.io/ko/blog/img/38/http_2.png)

- 바이너리 프레이밍 계층을 사용해 **요청과 응답의 멀티 플렉싱을 지원**함
- HTTP 메시지를 **바이너리 형태의 프레임**으로 나누고, 이를 전송 후 받은 쪽에서 다시 조립함
- 요청과 응답이 동시에 이루어져 하나의 연결에 여러 요청과 응답이 뒤섞여있음

- **Multiplexed Streams **
  - **한 커넥션에 여러개의 메세지를 동시에 주고받을 수 있음**
- 요청이 커넥션 상에서 다중화 되므로 **HOL(Head Of Line) Blocking이 발생하지 않음**
- **Stream Prioritization**
  - 요청 **리소스간 의존 관계(우선순위)를 설정**함
- **Header Compression **
  - **Header 정보**를 HPACK 압축 방식을 이용하여 **압축 전송**함
- **Server Push**
  - HTML 문서 상에 필요한 리소스를 **클라이언트 요청 없이** 보내줄 수 있음
- **HTTP/1.1과 높은 수준의 호환성** - 메소드, 상태코드, URI 및 헤더 필드
- 페이지 로딩 속도 향상



<br>

## ✨ 자바 8 람다식

> https://velog.io/@think2wice/Java-Java8-%EB%9E%8C%EB%8B%A4%EC%8B%9D
>
> https://coding-factory.tistory.com/265

### 람다식이란?

람다식이란 식별자 없이 실행 가능한 함수를 말한다. 간단하게 함수를 변수처럼 사용할 수 있는 개념이다. 자바 8 이전에는 메소드라는 함수 형태가 존재하지만 객체를 통해서만 접근이 가능했고 그 자체를 변수로 사용하진 못했다. 자바 8에서부터 람다식이 포함됨으로써 함수를 변수처럼 사용할 수 있기 때문에, 파라미터로 다른 메소드의 인자를 전달할 수 있고 리턴값으로 함수를 받을 수도 있다. 

~~~java
// 람다식 사용법
(매개변수, ...) -> { 실행문 ... }
~~~



### 람다식의 장단점

- 장점

  - 코드를 간결하게 만들 수 있다.
  - 개발자의 의도가 명확히 드러나므로 가독성이 향상된다
  - 함수를 만드는 과정 없이 한번에 처리할 수 있기 때문에 개발 시간이 줄어든다
  - 병렬 프로그래밍에 용이하다

- 단점

  - 람다식의 호출을 위해 직접 메소드를 호출해야한다

  - 람다를 사용하면서 만드는 익명함수는 재사용이 불가능하다
  - 디버깅이 다소 까다롭다
  - 재귀로 만들 경우 다소 부적합하다



### 함수형 인터페이스

`함수형 인터페이스`란 간단히 말해 메소드를 하나만 가지고 있는 인터페이스이다. 함수 구현만을 위해 만들어진 인터페이스이며 `Runnable` , `Comparator` 등의 인터페이스가 있다. 사용자가 원하는 함수형 인터페이스를 정의해서 사용할 수 있는데, `@FunctionalInterface` 어노테이션을 이용해 정의하면 된다. 람다식은 함수형 인터페이스를 간편하게 구현하는 역할을 한다.

~~~java
@FunctionalInterface
interface Square{
    public int run(int number);
}

public void f(){
  int number = 10;
  Square s = (num) -> num*num; 
  int squaredNum = s.run(number);
}
~~~



<br>

## ✨ RDBMS와 NoSQL

> https://kimsangyeon.github.io/sql/nosql/database/2019/08/16/rdbms-nosql.html

<br>

### RDBMS (Relational DBMS)

`RDMBS`는 `Relational Database Management System`으로 말 그대로 관계형 데이터베이스 관리 시스템이다. `RDBMS`는 정해진 데이터 스키마에 따라 데이터베이스 테이블에 저장되며, 관계를 통한 테이블간 연결을 통해 사용된다. 이 때문에 `RDBMS`는 데이터 관리를 효율적으로 하기 위해 구조화가 굉장히 중요하다.

정해진 스키마에 따라 데이터를 저장해야 하기 때문에 명확한 데이터 구조를 보장하고, 각 데이터에 맞게 테이블을 나누어 데이터 중복을 피해 공간을 절약할 수 있다. 그러나 관계로 인한 시스템 복잡도를 고려햐여 구조화를 해야하고 시스템이 복잡해질수록 Query문지 복잡해지고 성능이 저하된다. 또한 수평적 확장이 어려워 수직적 확장을 대부분 하기 때문에 한계에 직면할 수 있다.

### NoSQL (Not Only SQL)

`NoSQL`은 `Not Only SQL` 혹은 `Non relational Database`라고 부른다. NoSQL은 관계형 데이터베이스와 반대되는 방식을 사용하여 스키마와 관계라는 개념이 없다. NoSQL은 스키마가 없기 때문에 좀 더 데이터를 자유롭게 관리할 수 있으며 테이블과 같은 개념으로 컬렉션이라는 형태로 데이터를 관리한다.

장점으로는 RDBMS보다 자유롭게 데이터를 추가할 수 있으며, 이는 복잡한 테이블 간의 관계를 형성하는 형태의 구조를 신경쓰지 않아도 된다는 것이다. NoSQL은 분산 처리 목적으로 나왔기 때문에, 프레임워크에서 분산 처리 기능을 포함하고 있다고 한다. 단점으로는 자유롭게 데이터를 추가할 수 잇기 때문에 컬렉션에 중복된 데이터가 저장이 가능해진다. 데이터 업데이트시 중복되어 있는 데이터를 똑같이 관리 해주어야 한다.

<br>

## ✨ BFS와 DFS

> https://velog.io/@kjh107704/%EA%B7%B8%EB%9E%98%ED%94%84-BFS%EC%99%80-DFS
>
> https://yunyoung1819.tistory.com/86

<br>

`BFS`와 `DFS`는 그래프 탐색 방법의 대표적인 두 가지이다. 그래프의 탐색 목적은 **모든 정점을 한 번씩 방문**하는 것이다. 어떻게 방문할 것이냐에 따라 DFS와 BFS로 나뉘어진다.

- `BFS` : 너비 우선 탐색
- `DFS` : 깊이 우선 탐색

### BFS (Breadth First Search)

`BFS`의 기본 작동 방식은 `queue`를 이용하여 지금 위치에서 인접한 노드를 모두 큐에 넣는 방식이다. queue에 넣을 시점에 해당 노드를 방문했다고 체크해야 한다.

### DFS (Depth First Search)

`DFS`의 기본 작동 방식은 `stack`을 이용해서 갈 수 있는 만큼 최대한 깊이 간 후, 더 이상 갈 곳이 없다면 이전 정점으로 돌아간다는 것이다. 

![img](https://t1.daumcdn.net/cfile/tistory/997C3C3E5BD01AF41D)