# 💣day10 (2021/01/27)

<br>

## ✨ 자바 7과 8

>https://lastvirgo266.github.io/Java-7-%EA%B3%BC-Java8-%EC%B0%A8%EC%9D%B4/
>
>https://sabarada.tistory.com/39

<br>

### Java 7

- String in Switch

  - Switch 문 내에서 문자열 사용 가능

- Type Inference

  - 제네릭 타입 파라미터를 선언과 생성시에 중복해서 써줘야 했지만 자바 7부터는 컴파일러가 타입을 추론함

  ~~~java
  //Before Jdk 7
  List<Integer> primes = new ArrayList<Integer>();
  
  //Jdk7
  List<Integer> primes = new ArrayList<>();
  ~~~

- Underscore in Numberic literal

  - 실수, 정수형에 자릿수를 표현하기 위한 '_' 문자열을 사용할 수 있음

- Automatic resource management

  - 사용한 리소스를 `.close()`하지 않아도 Try문 안에 리소스를 선언하면 자동으로 리소스를 관리함

- Catching Multiple Exception Type in Single Catch Block

  - 단일 catch 블록에서 여러개의 예외처리가 가능

- 새로운 Gabage Collector 추가

### Java 8

- Lambda Expression
- Stream API
  - 배열이나 컬렉션에 저장된 데이터에 접근하기 위해 반복문이나 반복자를 사용해야 했으나 스트림 API를 사용하면 컬렉션, 데이터 모두 같은 방법으로 다룰 수 있음
- Enhanced Interfaces
  - java 8 이전에 interface는 public abstract methods만 허용함
  - java 8부터는 static과 default 메소드를 사용할 수 있음
- java.time package
  - Calendar 클래스의 문제점을 해결함
- Nashorn
  - 자바스크립트의 기본엔진인 모질라 Rhino를 사용했지만 자바의 최신 개선 사항을 활용하지 못함에 따라 새로운 엔진인 Nashorn을 도입

### 왜 람다를 도입했는가

> https://ktko.tistory.com/entry/%EC%9E%90%EB%B0%94-18-%EB%B2%84%EC%A0%84-%ED%8A%B9%EC%84%B1%EB%9E%8C%EB%8B%A4-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EB%B6%80%EB%B6%84-%EC%A0%95%EB%A6%AC%ED%95%B4%EB%B3%B4%EA%B8%B0

<br>

## ✨ 자바 8 스트림

> https://futurecreator.github.io/2018/08/26/java-8-streams/
>
> https://jeong-pro.tistory.com/165

### 스트림(Streams)

자바 8에서 추가한 `스트림(Streams)`은 람다를 활용할 수 있는 기술 중 하나이다. 자바 8 이전에는 배열 또는 컬렉션의 인스턴스를 다루는 방법은  `for` 또는 `foreach`문을 돌면서 요소 하나씩 꺼내 다루는 방법이였다. 스트림은 데이터를 추상화해서 다루기 때문에, 다양한 형태로 저장된 데이터를 위한 공통된 방법을 제공한다.

스트림은 `데이터의 흐름`이다. 배열 또는 컬렉션 인스턴스에 함수 여러 개를 조합해서 원하는 결과를 필터링하고 가공된 결과를 얻을 수 있다. 또한 람다를 이용해서 코드의 양을 줄이고 간결하게 표현할 수 있다. 또 하나의 장점은 병렬처리가 가능하다. 즉, 쓰레드를 이용해 많은 요소들을 빠르게 처리할 수 있다

- 스트림 동작
  1. 스트림 생성
  2. 스트림 중개 연산 
     - `filter`  `map` `peek` `sorted` `limit` `distinct` `skip` 
  3. 스트림 최종 연산 
     - `count` `min` `max` `sum` `average` `reduce` `forEach` `collect` `iterator`

~~~java

    
// 정수형 배열에서 스트림 생성
Integer[] arr1 = new Integer[] {1, 5, 11, 13, 20, 52};
Stream stream1 = Arrays.stream(arr1);
stream1.map(i -> i * 2);
stream1.filter(i -> i % 2 == 0);			// 재사용이 불가능하기 때문에 에러 발생!
 
 
// 정수형 배열에서 스트림 생성
Integer[] arr2 = new Integer[] {1, 5, 11, 13, 20, 52};
Stream stream2;
stream2 = Arrays.stream(arr2)
                .filter(i -> i % 2 != 0)	// {1, 5, 11, 13}
                .map(i -> i * 2);			// {2, 10, 22, 26}
~~~



### 스트림 특징

- 스트림은 내부 반복을 통해 작업을 수행함
- 스트림은 단 한번만 사용할 수 있음. 재사용 불가함
- 원본 데이터를 변경하지 않음
- 스트림의 연산은 필터-맵 기반의 API를 사용하여 lazy 연산을 통해 성능을 최적화함
- 스트림은 parallelStream() 메소드를 통해 간단한 병렬처리를 지원함

<br>

## ✨ keep-alive 헤더

> https://weicomes.tistory.com/1
>
> https://goodgid.github.io/HTTP-Keep-Alive/

<br>

### Keep-Alive

- HTTP 기본 구조를 바탕으로 맺어진 Socket연결이 종료된 시점부터 웹 서버에 정의된

  Keep-Alive Timeout 까지 기존 연결을 유지하는 기능

- 정의된 시간 내에 새로운 HTTP요청이 발생한다면 맺어진 Socket 연결을 지속적으로 유지할 수 있음

- HTTP 1.1 부터 `Keep-Alive` 기능 제공

- 설정 방법

  - 요청 헤더에 `Connection : keep-alive` 기재

  - 응답 헤더에 `Connection : keep-alive` 기재

  - `Keep-Alive : timeout=5, max=100` : 하나의 연결을 5초동안 유지. 최대 100개까지 허용

    

<br>

## ✨ 내부 조인과 외부 조인 

> 

<br>

중복 없는 열들을 join한다고 가정했을 때 내부조인은 교집합, 외부조인은 합집합을 얻을 수 있다.

### 조인 (JOIN)

서로 다른 테이블 간에 설정된 관계가 결합하여 1개 이상의 테이블에서 데이터를 조회하기 위해 사용된다. 이 때, 테이블간의 상호 연결을 조인이라고 한다. 각각의 테이블에 분리된 연관성 있는 데이터를 연결하거나 조합해야 하는데 이러한 일련의 작업들을 조인이라고 한다.

- 내부 조인(INNER JOIN) 
  - 두 테이블에서 **공통적으로 존재하는 컬럼의 값이 일치되는 행**을 연결하여 결과를 생성하는 조인
  - NULL값을 포함하지 않음
- 외부 조인(OUTER JOIN)
  - 상호 테이블간에 일치되는 값으로 연결되는 내부조인과는 달리 어느 한 테이블에 공통 컬럼값이 없더라도 해당 로우들이 조회결과에 포함되게 하는 조인
  - 기준 테이블은 NULL값을 포함함
  - LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN



### 외부 조인 (OUTER JOIN)

상호 테이블간에 일치되는 값으로 연결되는 내부조인과는 달리 어느 한 테이블에 공통 컬럼값이 없더라도 해당 로우들이 조회결과에 포함되게 하는 조인이며 조회 조건에서 (+) 기호를 사용하여 조인함. 기준 테이블은 NULL값을 포함함