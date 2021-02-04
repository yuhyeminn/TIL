# 💣day13 (2021/02/03)

<br>

## ✨ 그래프와 트리의 차이점

>https://bamdule.tistory.com/68

<br>

### 트리 (Tree)

트리는 정점(Node) 와 선분(Branch)을 이용하여 사이클이 이루어지지 않게 구성된 자료구조이다. 트리는 노드간에 부모-자식의 관계를 가지는 방향이 있는 연결을 가지고 루트 노드를 가지고 있다.

- 트리의 특징
  - 계층 모델
  - 비순환 그래프
  - 노드가 N개인 트리는 항상 N-1개의 간선을 가진다.
  - 노드간 최단경로가 1개 뿐이다.
  - 순회는 Pre-order, In-order, Post-order로 이루어진다.
  - 트리는 이진트리, 이진 탐색 트리, 균형 트리, 이진 힙 등이 있다.

<br>

### 그래프 (Graph)

노드와 노드를 연결하는 간선들로 구성된 자료구조이다.

- 그래프의 특징
  - 네트워크 모델
  - 노드들 사이에 방향/무방향 경로를 가질 수 있다.
  - 순환 혹은 비순환
- 그래프의 종류
  - 무방향 그래프 : 간선을 통해 양방향으로 갈 수 있음
  - 방향 그래프 : 간선에 방향이 존재하는 그래프
  - 가중치 그래프 : 간선을 이동하는데 비용이나 가중치가 할당된 그래프

<br>

## ✨ 자바의 hashCode()와 eqauls()

> https://www.hanumoka.net/2018/04/12/java-20180412-java-equals-hashCode/

자바에서 `hashCode()`와 `equals()` 메소드는 `Object`클래스의 메소드 이다. `Object`는 가장 상위클래스에 있기 때문에, 모든 객체는 `equals()`와 `hashCode()`를 사용할 수 있다. `equals()` 와 `hashCode()`를 재정의하여 객체가 논리적으로 일치하는지 확인하는 용도로 사용된다.

### equals

Object.equals() 메소드는 비교연산자인 == 과 동일한 결과를 리턴한다. 즉, 객체의 일치여부를 비교하여 true, false를 반환한다.

~~~java
Object obj1 = new Object();
Object obj2 = new Object();
		
boolean result1 = obj1.equals(obj2);
boolean result2 = (obj1 == obj2);
		
System.out.println("equals 결과 :"+result1); // 결과 false
System.out.println("==연산 결과 :"+result2); // 결과 false
~~~

String 클래스의 equals() 메소드의 경우 논리적인 문자열을 비교하도록 재정의 되어 있다. 사용자가 equals() 메소드를 재정의 하지 않는 이상, 객체의 메모리 값만 비교하게 된다.

~~~java
//새로운 문자열 객체 생성, new 연산자로 강제로 새로운 메모리 주소를 할당하게 했다.
String name1 = new String("가나다라"); 
String name2 = new String("가나다라");
		
boolean result1 = name1.equals(name2);
boolean result2 = (name1 == name2);
		
System.out.println("equals결과 :"+result1);  // 결과 true
System.out.println("==연산결과 :"+result2);  // 결과 false
~~~

<br>

### hashCode

Object.hashCode() 메소드는 객체의 주소값을 이용하여 객체 고유의 해시코드를 리턴하는 함수이다. hasCode()를 equals()와 함께 오버라이딩 해야하는 이유는 HashMap, HashSet과 같은 프레임워크에서 객체 비교시 hashCode() 결과 값을 통해 해시코드가 다르면 다른 객체로 판단하기 때문이다.

즉, 객체의 동등 비교를 위해서 hashCode() 메소드도 재정의해서 논리적 동등 객체일 경우 동일한 해시코드가 리턴되도록 해야한다.

<br>

## ✨ 스프링 Bean

> https://atoz-develop.tistory.com/entry/Spring-%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B9%88Bean%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%83%9D%EC%84%B1-%EC%9B%90%EB%A6%AC

<br>

### 빈(Bean)

Spring IoC 컨테이너가 관리하는 자바 객체를 `빈(Bean)`이라는 용어로 부른다. new 연산으로 생성해낸 객체가 아닌 ApplicationContext가 알고 있는 객체, 즉 ApplicationContext가 만들어서 그 안에 담고있는 객체를 의미한다.

<br>

### 빈(Bean) 등록

빈을 만드는 방법은 기본적으로 크게 2가지가 있다

1. Component Scanning
2. 빈 설정파일에 직접 빈을 등록

<br>

### Component Scan

`@ComponentScan` 어노테이션과 `@Component` 어노테이션을 사용해서 빈을 등록하도록 하는 방법이다. 간단히 말하면 `@ComponentScan` 어노테이션은 어느 지점부터 컴포넌트를 찾으라고 알려주는 역할을 하고 `@Component`는 실제로 찾아서 빈으로 등록할 클래스를 의미한다. 

SpringBoot에선 `@SpringBootApplication` 어노테이션에 내부적으로 `@ComponentScan` 어노테이션이 적용되어 있다.

<br>

### 빈 설정파일

빈 설정파일은 xml파일이나 java파일로 작성할 수 있는데 최근엔 java 설정파일을 많이 사용한다. 자바 설정파일은 자바 클래스를 일반적으로 `~Configuration`과 같이 명명하고, `@Component` 어노테이션을 붙인다. 클래스안에서 `@Bean` 어노테이션을 이용해 빈을 생성한다.

<br>

## ✨ 스프링 컨테이너와 Bean의 생명주기

> https://transferhwang.tistory.com/104

<br>

### 스프링 컨테이너 생명주기

**생성 - 설정 - 사용 - 종료**

1. `GenericXmlApplicationContext`를 이용한 스프링 컨테이너 초기화(생성)
   - 빈(Bean) 객체 생성, 초기화 및 의존 객체 주입
2. `getBean()`응 이용한 빈(Bean) 객체 이용
3. `close()`를 이용한 스프링 컨테이너 종료
   - 빈(Bean) 객체 소멸

<br>

### Bean 의 생명주기

스프링 컨테이너가 생성됨과 동시에 빈(Bean) 객체도 생성되므로 빈 객체의 생명주기는 스프링 컨테이너의 생명주기와 같다고 할 수 있다.

빈 객체 생성 시점이나 소멸시점에 특정 작업을 할 수 있는데, 그 방법은 인터페이스를 이용하거나 `init-method` 와 `destroy-method`속성을 이용하는 방법이 있다.

- 인터페이스
  - `InitializegBean` - `afterPropertiesSet()` 메소드 재정의 하여 빈 생성될 때 수행할 작업 정의
  - `DisposableBean` - `destroy()` 메소드 재정의하여 빈 소멸될 때 수행할 작업 정의
- `init-method`, `destroy-method`
  - 빈 설정시에 init-method, destroy-method속성에 적용할 메소드명을 속성값으로 지정해주고, 그 속성과 같은 이름의 함수를 만들면 그 기능이 적용된다.