# 💣day0 (2021/00/00)

<br>

## ✨ JPA 영속성 컨텍스트의 이점

>https://gmlwjd9405.github.io/2019/08/06/persistence-context.html
>
>https://ict-nroo.tistory.com/130

<br>

### 영속성 컨텍스트 (Persistence Context)

`영속성 컨텍스트`는 JPA를 이해하는 데 가장 중요한 용어로 `엔티티를 영구 저장하는 환경`이라는 뜻이다. 애플리케이션과 데이터베이스 사이에서 객체를 보관하는 가상의 데이터베이스같은 역할을 한다. JPA는 스레드가 하나 생길 때 마다(매 요청마다) EntityManagerFactory에서 EnityManager를 생성한다. `엔티티 매니저(Entity Manager)`는 내부적으로 DB connection pool을 사용해서 DB에 접근한다.

<br>

### 엔티티의 생명주기

- 비영속 (new/transient)
  - 영속성 컨텍스트와 전혀 관계가 없는 상태
  - 객체를 생성만 한 상태
- 영속 (managed)
  - 영속성 컨텍스트에 저장된 상태
  - Entity가 영속성 컨텍스트에 의해 관리되는 상태
- 준영속 (detached)
  - 영속성 컨텍스트에 저장되었다가 분리된 상태
  - 영속성 컨텍스트에서 지운 상태
- 삭제 (removed)
  - 실제 DB 삭제를 요청한 상태

<br>

### 영속성 컨텍스트의 이점

> - 1차 캐시
>
> - 동일성 보장
>
> - 트랜잭션 지원하는 쓰기 지연
>
> - 변경 감지
>
> - 지연 로딩

#### 1차 캐시

- 영속성 컨텍스트 내부에 1차 캐시가 존재한다.

- 엔티티를 영속성 컨텍스트에 저장하면 1차 캐시에 Map<Key, Value> 로 값이 저장됨

  - key : @Id로 선언된 필드 값(PK)
  - value : 해당 엔티티 자체 

- `entityManager.find()` 실행 시, DB보다 먼저 1차 캐시를 조회한다

  - 1차 캐시에 해당 Entity가 존재하면 바로 반환한다
  - 1차 캐시에 해당 Entity가 없다면?
    - DB에서 조회한다.
    - 해당 Entty를 DB에서 꺼내와 1차 캐시에 저장한다
    - Entity를 반환한다

- 1차 캐시는 글로벌하지 않다. 스레드 하나가 시작할 때 부터 끝날 때까지 잠깐 사용한다.

  - EntityManager는 Transaction 단위로 만들고 해당 DB Transaction이 끝날 때 같이 종료된다.

  - 즉, 1차 캐시도 모두 날라가기 때문에 짧은 순간에만 이득이 있어 큰 성능 이점을 갖고있지 않다.
  - 하지만 비즈니스 로직이 매우 복잡한 경우에 효과가 있다.

<br>

#### 동일성 보장 (Identity)

~~~ java
Member a = entityManager.find(Member.class, "member1");
Member b = entityManager.find(Member.class, "member1");
System.out.println(a == b); // 동일성 비교 true
~~~

- 영속 Entity의 동일성(==비교)을 보장한다.
  - member1에 해당하는 Entity를 2번 조회하면 1차 캐시에 의해 같은 Reference로 인식된다.
- 1차 캐시로 반복 가능한 읽기 등급의 트랜잭션 격리 수준을 DB가 아닌 애플리케이션 차원에서 제공한다.

<br>

#### 트랜잭션을 지원하는 쓰기 지연(Transactional Write-Behind) - 엔티티 등록

![img](https://github.com/namjunemy/TIL/blob/master/Jpa/inflearn/img/04_transactional_write_behind.PNG?raw=true)

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
// 엔티티 매니저는 데이터 변경시 트랜잭션을 시작해야 한다.
transaction.begin(); // 트랜잭션 시작

em.persist(memberA);
em.persist(memberB);
// 이때까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다 (flush).
transaction.commit(); // 트랜잭션 커밋
```

- 트랜잭션 내부에서 `persist()`가 일어 날 때
- 엔티티들을 1차 캐시에 저장하고 `쓰기 지연 SQL 저장소` 라는 곳에 `insertQuery`들을 생성해서 쌓아 놓는다.
- DB에 바로 저장하지 않고 기다리다가, `commit`하는 시점에 쿼리들을 DB로 보낸다. (동시 or 하나씩)
- 이렇게 쌓여있는 쿼리들을 DB에 보내는 동작이 `flush()` 이다.
  - 1차 캐시를 지우지 않고 쿼리들을 DB에 날려 DB와 싱크를 맞추는 역할을 한다.
  - `flush()` 이후에 실제 DB Transaction이 커밋된다.

- jdbc 일괄 처리 옵션 (jdbc batch option)

  ~~~xml
  <property name="hibernate.jdbc.batch_size" value=10/>
  ~~~

  - persistence.xml에 위와 같은 옵션을 줄 수 있다.
  - commit 직전까지 insert query를 해당 사이즈 만큼 모아서 한번에 처리한다.

<br>

#### 변경 감지 (Dirty Checking) - 엔티티 수정

- Entity 데이터 수정 시 영속성 컨텍스트에 해당 데이터를 업데이트 해달라고 알려주지 않아도 된다.
  - Entity 데이터만 수정하고 commit 하면 알아서 DB에 반영된다.
  - 즉, 데이터를 set하면 해당 데이터의 변경을 감지하여 자동으로 UPDATE Query를 보낸다.
- 변경 감지 (Dirty Checking)
  - 1차 캐시에 저장할 때, snapshot 또한 저장한다.
  - commit 또는 flush가 일어날 때, Entity와 snapshot을 비교한다.
  - 변경사항이 있으면 UPDATE Query를 만들어 쓰기 지연 SQL 저장소에 넣어놨다가 DB 반영 후 commit한다.
- Dirty Checking으로 생성되는 update 쿼리는 기본적으로 모든 필드를 업데이트한다.
  - @DynamicUpdate를 통해 엔티티 수정 시 변경된 필드만 반영되도록 할 수 있다.

<br>

#### 엔티티 삭제

```java
Member memberA = em.find(Member.class, "memberA");
em.remove(memberA); // 엔티티 삭제
```

- Entity 수정에서의 매커니즘과 동일하다.
- Transaction의 commit 시점에 DELETE Query가 나간다.

<br>

## ✨ JPA를 사용할 때 N + 1 문제가 발생하는 이유와 해결 방법

> https://www.popit.kr/jpa-n1-%EB%B0%9C%EC%83%9D%EC%9B%90%EC%9D%B8%EA%B3%BC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95/
>
> https://wwlee94.github.io/category/blog/spring-jpa-n+1-query/#lazy-%EB%B0%A9%EC%8B%9D-%EA%B2%B0%EA%B3%BC-1
>
> https://jojoldu.tistory.com/165

### N + 1 조회 문제

N+1 조회 문제란 연관 관계에서 발생하는 이슈로, 연관 관계가 설정된 엔티티를 조회할 경우에 조회된 데이터 갯수(N) 만큼 연관관계의 조회 쿼리가 추가로 발생하여 데이터를 읽어오게 되는 문제를 말한다.



### N + 1 조회 문제 발생 원인

`Spring Data JPA`에서 제공하는 Repository의 `findAll()` , `findById` 등과 같은 메소드를 사용하면 바로 DB에 SQL 쿼리를 날리는 것이 아니다. **`JPQL`** 이라는 객체 지향 쿼리 언어를 생성해서 실행시킨 후 JPA가 이것을 분석하여 SQL을 생성하고 실행한다. `JPQL` 입장에서는 `LAZY`로딩, `EAGER` 로딩과 같은 글로벌 패치 전략을 신경쓰지 않고 SQL을 생성한다. 이 과정에서 N+1조회 문제가 발생하는 것이다. 

#### * JPQL이란 ?

JPQL이란 플랫폼에 독립적인 객체지향 쿼리 언어이다. 자바 코드에서 데이터베이스를 조회할 때 특정 SQL이나 저장 엔진에 종속되지 않게 도와준다.



#### * N + 1 조회 문제가 발생하는 경우

1. `EAGER` 전략으로 데이터를 가져오는 경우
2. `LAZY` 전략으로 데이터를 가져온 이후에, 가져온 데이터에서 하위 엔티티를 다시 조회하는 경우



### 해결방법

#### * 패치 조인 (Fetch Join)

join 시 `fetch` 키워드를 사용하게 되면 연관된 엔티티나 컬렉션을 한번에 같이 조회할 수 있다. 즉, 패치 조인을 사용하게 되면 연관된 엔티티는 프록시가 아닌 실제 엔티티를 조회하게 되므로 연관관계 객체까지 한 번의 쿼리로 가져올 수 있다.

하지만 페치 조인을 이용할 경우 JPA가 제공하는 페이징 API인  `Pagealble` 기능을 사용할 수 없다. 또한 `1:N` 관계가 2개인 엔티티를 페치조인할 수 없다는 점에서 한계점이 있다.

<br>

#### * Batch Size 조절

`@BatchSize(size = ? )` 에서 설정한 size만큼 데이터를 미리 로딩한다. 즉 연관된 엔티티를 조회할 때 size만큼 where in 쿼리를 통해서 조회하게 되고, size를 넘어가게 되면 추가로 where in쿼리를 진행한다.  JPA의 페이징 API 기능처럼 개수가 고정된 데이터를 가져올 때 함께 사용하면 유용하게 사용 가능하다. 하지만 글로벌 패치 전략을 `EAGER`로 변경해야하는 단점이 존재한다.



<br>

## ✨ 스프링에서의 CORS 설정

> https://ithub.tistory.com/63
>
> https://spring.io/blog/2015/06/08/cors-support-in-spring-framework

<br>

### CORS 란?

CORS란 교차 출처 리소스 공유(CORS, Cross-Origin resources sharing)으로서, 추가 HTTP 헤더를 이용하여 한 출처에서 실행중인 웹 애플리케이션이 다른 출처의 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다. 웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 보낸다.

### 스프링에서의 CORS 설정

~~~java
@CrossOrigin(origins="*")
@RestController
public class CommonController {
    ...
}
~~~

스프링에서의 CORS 설정은 `@CrossOrigin` 어노테이션을 사용하여 간단하게 설정할 수 있다. Controller 자체에 적용할 수도 있고 특정 method에 설정 가능하다. 또한 `origins` 라는 속성을 이용하여 특정 도메인만 접속을 허용하는 것을 지정할 수 있다.

<br>

## ✨ 웹사이트에 접속하는 과정

> 

<br>

