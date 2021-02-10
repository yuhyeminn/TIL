# 💣day14 (2021/02/05)

<br>

## ✨ 데이터베이스의 인덱스

>https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%8D%B1%EC%8A%A4_(%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)
>
>https://mangkyu.tistory.com/96

<br>

### 인덱스(Index)

데이터베이스에서 `인덱스(Index)`란 **테이블에 대한 동작의 속도를 높여주는 자료 구조**를 말한다. 인덱스는 테이블 내의 **1개의 컬럼 혹은 여러개의 컬럼**을 이용하여 생성될 수 있다. 고속의 검색 동작 뿐만 아니라 레코드 접근과 관룐 효율적인 순서 매김 동작에 대한 기초를 제공한다.

인덱스를 활용하면, 데이터를 조회하는 SELECT 외에도 UPDATE나 DELETE의 성능이 함께 향상된다. 그러한 이유는 해당 연산을 수행하려면 해당 대상을 조회해야만 작업을 할 수 있기 때문이다. 만약 index를 사용하지 않은 컬럼을 조회해야 하는 상황이라면 전체를 탐색하는 Full Scan을 수행해야 한다. Full Scan은 전체를 비교하여 탐색하기 때문에 처리 속도가 떨어진다.

<br>

### 인덱스(Index)의 장단점

#### 장점

- 테이블을 조회하는 속도와 그에 따른 성능을 향상시킬 수 있다
- 전반적인 시스템의 부하를 줄일 수 있다

#### 단점

- 인덱스를 관리하기 위해 DB의 약 10%에 해당하는 저장공간이 필요하다
- 인덱스를 관리하기 위해 추가 작업이 필요하다
- 인덱스를 잘못 사용할 경우 오히려 성능이 저하되는 역효과가 발생할 수 있다
  - CREATE, DELETE, UPDATE가 빈번한 컬럼에 인덱스를 추가하면 인덱스의 크기가 비대해져 성능이 오히려 저하될 수 있다
    - 인덱스는 DELETE, UPDATE된 인덱스에 대해 기존 인덱스를 사용하지 않는다고 처리하기 때문에 실제 데이터에 비해 인덱스의 양은 비대해짐

<br>

### 인덱스(Index)를 사용하면 좋은 경우

- 규모가 작지 않은 테이블
- INSERT, UPDATE, DELETE가 자주 발생하지 않는 컬럼
- JOIN이나 WHERE 또는 ORDER BY에 자주 사용되는 컬럼
- 데이터의 중복도가 낮은 컬럼

<br>

### 인덱스 종류

- `B+-Tree 인덱스 알고리즘`
  - 일반적으로 사용되는 인덱스 알고리즘
  - 컬럼의 값을 변형하지 않고(값의 앞부분만 잘라서 관리) 원래의 값을 이용해 인덱싱함
  - B-Tree (Balanced-Tree) 
    - 균형트리. 루트로부터 리프까지의 거리가 일정한 트리 구조
    - 데이터가 정렬된 상태로 유지되어 있음
    - 최상위 루트 노드, 중간 브랜치 노드, 최하위 리프노드로 구성되어 있음
    - 한 노드당 자식 노드가 2개 이상 가능함
  - B+Tree (Balanced+Tree) 
    - B-Tree의 확장개념으로 브랜치 노드에 key만 담아두고 data는 담아두지 않음
    - 오직 리프노드에만 key와 data를 저장하고, 리프 노드끼리 LinkedList로 연결되어 있음
    - 데이터를 담아두지 않기 때문에 메모리를 더 확보하며 트리의 높이는 더 낮아짐
    - 리프 노드에 데이터가 모두 있기 때문에 한번의 선형탐색만 하면 되므로 B-Tree에 비해 풀스캔이 빠름
- `Hash 인덱스 알고리즘`
  - 컬럼의 값을 해시 값으로 계산해서 인덱싱하는 알고리즘으로 매우 빠른 검색을 지원함
  - 값을 변형해서 인덱싱하기 때문에 특정 문자로 시작하는 값으로 검색을 하거나 값의 일부만으로 검색하고자할 땐 사용할 수 없음

<br>

## ✨ Redis와 Memcached의 차이

> https://pakpark.tistory.com/44

`Redis`와 `Memcached`의 공통점은**In-Memory 기반 캐시 솔루션**이라는 것이다. Memcached 는 캐시 솔루션이고, 이러한 Memcached 에 저장소의 개념이 추가된 것이 Redis 다. '캐시'는 빠른 속도를 위해서 어떤 결과를 저장해 두는 것을 의미하며, 또한 '데이터가 사라지면 다시 만들 수 있다' 는 전제를 내포하고 있다. 그런데 저장소라는 개념이 추가되며, '데이터가 유지되어야 한다'는 특성을 가지게 된다.

<br>

### Redis (Remote Dictionary Storage)

- 다양한 자료구조 제공
  - String, Set, Sorted Set, Hash List 등 다양한 자료구조 제공
  - 현재는 JSON 타입도 지원함
- 메모리 뿐만 아니라 디스크도 사용하기 때문에 데이터 복구시 유용함
  - Snapshots 제공
- 데이터 축출 (Data eviction)에 대한 세분화된 제어를 허용
  - 오래된 데이터를 삭제하여 새로운 데이터를 저장할 공간을 만들기 위한 메커니즘
- 싱글 스레드를 사용함

### Memcached 

- 멀티 스레드를 지원함
  - 더 많은 계산 리소스를 제공하여 Redis보다 쉽게 확장할 수 있음
  - 일관된 해싱 사용 여부에 따라 캐시된 데이터의 일부 또는 전부를 잃게 됨
-  Redis보다 적은 메모리를 요구
- 정적인 데이터 저장에 유리함
  - Redis만큼 정교하지 않지만, 메모리를 적게 소비하기 때문에 간단히 사용하기엔 더 효율적임
  - Redis는 Copy-on-Write 방식을 사용하기 때문에 사용하는 메모리보다 더 많은 메모리를 요구함

<br>

## ✨ Spring MVC의 동작 원리

> https://tinkerbellbass.tistory.com/40

<br>

### Spring MVC의 Request 처리 과정

1. **`DispatcherServlet`**이 모든 연결을 담당하며, 웹 브라우저로부터의 요청을 받음
2. - 요청이 들어오면 `DispatcherServlet`은**`HandlerMapping` **에게 컨트롤러 검색을 요청함
   - `HadlerMapping`은 클라이언트의 요청 경로를 이용해 **`컨트롤러 Bean 객체`**를 DispatcherServlet에 전달함
3. `DispatcherServlet`은 전달받은 컨트롤러 객체를 처리할 수 있는 **`HandlerAdapter`** 에게 요청 처리를 위임
4. `HandlerAdapter`는 컨트롤러의 알맞은 **메서드를 호출해 요청을 처리함**
5. 처리 결과를 **`ModelAndView`**라는 객체로 `DispatcherServlet`에게 반환
6. - `DispatcherServlet`은 전달받은 결과의 뷰를  **`ViewResolver`** 객체를 이용하여 검색함
   - `ViewResolver`는 ModelAndView의 뷰 이름에 해당하는 **`View객체`**를 찾거나 생성하여 리턴함
7. `DispathcerServlet`는 `VeiwResolver`가 리턴한 **`View 객체`에게 응답 결과 생성을 요청**
8. - JSP를 사용하는 경우, View 객체는 JSP를 실행함으로서 브라우저에게 전송할 응답 결과를 생성함
   - ModelAndView 의 Model 객체에 담겨 있는 데이터가 응답 결과에 필요하면 Model 에서 데이터를 꺼내 JSP 에서 사용할 수 있음

> ```
> 클라이언트의 요청을 실제로 처리하는 것은 컨트롤러이고, 
> DispatcherServlet 은 클라이언트의 요청을 전달 받는 창구 역할을 한다.
> DispatcherServlet 에게 어떤 컨트롤러가 요청을 처리하는가는 중요하지 않으며, 처리 결과를 ModelAndView 타입의 객체로 전달 받을 수 있기만 하면 된다.
> 이 때, 사용할 컨트롤러를 찾고, 처리 결과를 ModelAndView 객체로 변환해 주는 객체가 HandlerAdapter 이다.
> 
> 핸들러 객체의 실제 타입마다 그에 알맞은 HandlerMapping 과 HandlerAdapter 가 존재하기 때문에 사용할 핸들러의 종류에 따라 해당 HandlerMapping 과 HandlerAdapter 를 스프링 빈으로 등록해 주어야 하는데, 스프링 설정 기능(<mvc:annotaion-driven>)을 사용하면 직접 등록하지 않아도 스프링이 알아서 ㅓㅁ처리해 준다.
> 
> 요청을 처리할 컨트롤러를 찾기 때문에 ControllerMapping 이라는 이름이 어울리는데, 스프링 MVC 는 웹 요청을 처리할 수 있는 범용적인 프레임워크를 제공하고 있기 때문에, 클라이언트의 요청을 처리하는 객체가 컨트롤러가 아닐 수도 있다(HttpRequestHandler 등). 그래서 스프링 MVC 는 웹 요청을 실제로 처리하는 객체를 Handler 라고 표현하고 있다. 따라서 컨트롤러는 DispatcherServlet 입장에서 보면 한 종류의 핸들러 객체이다.
> 
> 출처: https://tinkerbellbass.tistory.com/40 [Welcome to NeverLand]
> ```



<br>

## ✨ Checked Exception과 Unchecked Exception

> https://madplay.github.io/post/java-checked-unchecked-exceptions

<br>

### 예외(Exception)란?

프로그래밍에서 **예외(Exception)**란 입력 값에 대한 처리가 불가능하거나, 프로그램 실행 중에 참조된 값이 잘못된 경우 등 정상적인 프로그램의 흐름을 어긋나는 것을 말한다. 그리고 자바에서 예외는 개발자가 직접 처리할 수 있기 때문에 예외 상황을 미리 예측하여 핸들링할 수 있다. 예외는 `CheckedException`과 `UncheckedException`으로 구분되며 간단하게 **RuntimeException을 상속하지 않는 클래스**는 Checked Exception, 반대로 상속한 클래스는 Unchecked Exception으로 분류할 수 있다.

![checked unchecked exceptions](https://madplay.github.io/img/post/2019-03-02-java-checked-unchecked-exceptions-2.png)

<br>

### Unchecked Exception

명시적인 예외 처리를 강제하지 않는 특징이 있기 때문에 Unchecked Exception이라 하며, catch로 잡거나 throw로 호출한 메서드로 예외를 던지지 않아도 상관이 없다.

<br>

### Checked Exception

반드시 명시적으로 처리해야 하기 때문에 Checked Exception이라고 하며, try catch로 예외를 처리해주거나 throws를 통해서 호출한 메서드로 예외를 던져야 한다.