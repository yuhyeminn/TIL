# 💣day17 (2021/02/15)

<br>

## ✨ Filter, Interceptor, AOP의 차이

>https://goddaehee.tistory.com/154

<br>

자바 웹 개발을 하다보면 공통적으로 처리해야 할 업무들이 많다. 예를 들어 로그인 관련 처리, 권한체크, XSS 방어 등이 있다. 공통 업무에 관련한 코드를 모든 페이지마다 작성한다면 중복된 코드가 많아지게 되고, 프로젝트 단위가 커질수록 서버에 부하를 줄 수도 있으며 소스 관리도 되지 않는다.

이러한 공통 업무는 따로 분리하여 관리하는 것이 좋으며 다음과 같은 세가지를 활용할 수 있다.

1. `Filter`
2. `Interceptor`
3. `AOP`

스프링 프레임워크에서 사용되는 `Filter`, `Interceptor`, `AOP` 세 가지 기능은 모두 요청 실행 전이나 실행 후에 추가적인 행동을 할 때 사용되는 기능들이다.

<br>

### Filter, Interceptor, AOP의 흐름

1. 서버를 실행시켜 서블릿이 올라오는 동안에 init이 실행되고, 그 후 doFilter가 실행된다. 

2. 컨트롤러에 들어가기 전 preHandler가 실행된다

3. 컨트롤러에서 나와 postHandler, after Completion, doFilter 순으로 진행이 된다.

4. 서블릿 종료 시 destroy가 실행된다.

![img](https://t1.daumcdn.net/cfile/tistory/9983FB455BB4E5D30C)

- Interceptor와 Filter는 Servlet 단위에서 실행된다. 반면 AOP는 메소드 앞에 Proxy 패턴의 형태로 실행된다.
- 실행 순서를 보면 Filter가 가장 바깥쪽에 있고, 그 안에 Interceptor, 그 안에 AOP가 있는 형태이다.
- 요청이 들어오면 Filter → Interceptor → AOP → Interceptor → Filter 순으로 거치게 된다.

<br>

### Filter

`Filter`는 말 그대로 요청과 응답을 거른 뒤 정제하는 역할을 한다. 서블릿 필터는 DispatcherServlet 이전에 실행이 되는데 필터가 동작하도록 지정된 자원의 앞단에서 요청내용을 변경하거나, 여러가지 체크를 수행할 수 있다. 또한 자원의 처리가 끝난 후 응답내용에 대해서도 변경하는 처리를 할 수가 있다. 보통 web.xml에 등록하고, 일반적으로 인코딩 변환 처리, XSS방어 등의 요청에 대한 처리로 사용된다.

- init() - 필터 인스턴스 초기화
- doFilter() - 전/후 처리
- destroy() - 필터 인스턴스 종료

<br>

### Interceptor

`Interceptor`는 요청에 대한 작업 전/후를 가로챈다. 필터는 스프링 컨텍스트 외부에 존재하여 스프링과 무관한 자원에 대해 동작한다. 하지만 `Interceptor`는 스프링의 DispatcherServlet이 컨트롤러를 호출하기 전, 후로 끼어들기 때문에 스프링 컨텍스트 내부에서 Controller(Handler)에 관한 요청과 응답에 대해 처리하며 스프링의 모든 빈 객체에 접근할 수 있다. `Interceptor`는 여러 개를 사용할 수 있고 로그인 체크, 권한 체크, 로그 확인 등의 업무 처리로 사용한다.

- preHandler() - 컨트롤러 메서드가 실행되기 전
- postHandler() - 컨트롤러 메서드 실행 직 후 view 페이지 렌더링 되기 전
- afterCompletion() - view 페이지가 렌더링 되고 난 후



### AOP

AOP는 객체 지향의 프로그래밍을 했을 때, 중복을 줄일 수 없는 부분을 줄이기 위해 종단면(관점)에서 바라보고 처리한다. 주로 로깅, 트랜잭션, 에러 처리 등 비즈니스단의 메서드에서 조금 더 세밀하게 조정하고 싶을 때 사용한다.

`Interceptor`와 `Filter`와 달리 메소드 전 후의 지점에 자유롭게 설정이 가능하며 주소, 파라미터, 어노테이션 등 다양한 방법으로 대상을 지정할 수 있다. 반면 HandlerInterceptor는 Filter와 유사하게 HttpServletRequest, HttpServletResponse를 파라미터로 사용한다.

- @Before - 대상 메서드의 수행 전

- @After - 대상 메서드의 수행 후

- @After-returning - 대상 메서드의 정상적인 수행 후

- @After-throwing - 예외발생 후

- @Around - 대상 메서드의 수행 전/후

  

<br>

## ✨ @Controller 와 @RestController의 차이

> https://mangkyu.tistory.com/49

Spring에서 컨트롤러를 지정해주기 위한 어노테이션은 `@Controller`와 `@RestController`가 있다. 전통적인 Spring MVC의 컨트롤러인 `@Controller`와 Restful 웹서비스의 컨트롤러인 `@RestController`의 주요한 차이점은 HTTP Response Body가 생성되는 방식이다.



### @Controller

`@Controller` 는 주로 **View를 반환**하기 위해 사용한다. 다음과 같은 흐름으로 Controller는 Client요청으로부터 View를 반환한다. `@Controller`가 View를 반환하기 위해서는 ViewResolver가 사용되며, ViewResolver 설정에 맞게 View를 찾아 렌더링 한다.

![img](https://blog.kakaocdn.net/dn/2BnED/btqybg36Dak/3HgL3gUKHBSOmyeM4hIn00/img.png)

`@Controller`는 주로 View를 반환 하지만 Data를 반환해야 하는 경우도 있다. `@ResponseBody`어노테이션을 활영 할 경우 Controller도 JSON형태의 데이터를 반환할 수 있다. @RestController가 Data를 반환하기 위해서는 viewResolver 대신에 HttpMessageConverter가 동작한다. 



![img](https://blog.kakaocdn.net/dn/bEJ1YG/btqx8Tvu8qa/lkDg8cu2G4xMi8Pg22C1f0/img.png)

HttpMessageConverter에는 여러 Converter가 등록되어 있고, 반환해야 하는 데이터에 따라 사용되는 Converter가 달라진다. Spring은 클라이언트의 HTTP Accept 헤더와 서버의 컨트롤러 반환 타입 정보 둘을 조합해 적합한 HttpMessageConverter를 선택하여 이를 처리한다.

- StringHttpMessageConverter - 단순 문자열
- MappingJackson2HttpMessageConverter - 객체

<br>

### @RestController

@RestController는 Spring MVC Controller에 @ResponseBody가 추가된 것이다. RestController의 주용도는 Json 형태로 객체 데이터를 반환하는 것이다. Spring 4 버전이후로 출시되었으며 `@Controller와 @ResponseBody`를 `@RestController`가 가지고 있기 때문에 데이터 중심의 구현 작동 방식은 `@ResponseBody`와 동일하다.



## ✨ 세션 기반 인증과 토큰 기반 인증

> https://jins-dev.tistory.com/entry/Session-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D%EA%B3%BC-Token-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D
>
> https://yonghyunlee.gitlab.io/node/jwt/
>
> https://mangkyu.tistory.com/55

<br>

웹서버는 stateless 프로토콜인 HTTP를 사용하기 때문에 웹 사이트에서 인증을 관리하기 위한 방안이 필요하다. 로그인을 한 유저들에 대해 권한이 필요해 매 요청마다 재로그인을 시킬 수는 없기 때문에 웹사이트는 일반적으로 유저의 접속 정보를 관리하기 위한 몇가지 방안을 사용한다.



### 세션(Session) 기반 인증

세션 기반 인증을 위해 Session과 Cookie가 사용된다.

- 세션 기반 인증 흐름

  ​	<img src="https://blog.kakaocdn.net/dn/be5HFu/btqAsR8iEdh/rk9Xno6XlQAwbTWFiGIXIk/img.png" alt="img" style="zoom:80%;" />

  1. 유저가 로그인 하면 세션이 서버 메모리에 저장됨
     - 이 때, 세션을 식별하기 위한 Session ID 기준으로 정보를 저장함
  2. 브라우저에 쿠키로 Session ID가 저장됨
  3. 쿠키에 정보가 담겨있기 때문에 브라우저는 해당 사이트에 대한 모든 Request에 Session ID를 쿠키에 담아 전송함
  4. 서버는 클라이언트가 보낸 Session ID와 서버 메모리로 관리하고 있는 Session ID를 비교하여 Verification을 수행함

- 장점

  - 구현이 명확하다. 실제 서버에서 로그인 상태 확인이 굉장히 유용함
  - 상대적으로 안전함. 
    - 서버측에서 관리하기 때문에 클라이언트 변조에 의해 영향받거나 데이터 손상 우려가 없음

- 단점

  - 유저의 세션에 대한 정보를 서버 메모리에서 관리한다는 부담이 있음
  - Scale Out/ Scale In 부담이 될 수 있음.
    - 결국 유저 상태에 무관하게 동작할 수 있도록 Data-Driven 아키텍쳐가 요구됨
  - 멀티 디바이스 환경에서 로그인 시 신경써줘야할 부분들이 생김

  

### Token 기반 인증

Token 기반 인증의 방법으로 많은 웹 서버들은 JWT(JSON Web Token) 을 사용한다. Token 기반 인증 방식과 Session 기반 인증 방식의 가장 큰 차이점은 유저의 정보가 서버에 저장되지 않는다는 점이다.

- 토큰 기반 인증 흐름

  ​	<img src="https://blog.kakaocdn.net/dn/ogoAg/btqAriyT5sY/YYt2wkEz50kKN47mLwRDXK/img.png" alt="img" style="zoom:80%;" />

  1. 유저가 로그인 하면 Token을 발급함
  2. 클라이언트는 발급된 Token을 저장함 (local storage)
  3. 클라이언트는 요청 시 저장된 Token을 Header에 포함시켜 보냄
  4. 서버는 매 요청 시 클라이언트로부터 전달받은 Header의 Token 정보를 Verification한 뒤, 해당 유저에 권한을 인가함

- 장점

  - 클라이언트에 저장되기 때문에 서버의 메모리에 부담이 되지않으며 Scale 에 있어 대비책을 고려할 필요가 없음
  - 멀티 디바이스 환경에 대한 부담이 없음

- 단점

  - 상대적으로 데이터 손상의 위험이 큼
  - 구현을 하다보면 서버측에 token blacklist를 관리하게 될 가능성이 있고, 그렇게 되면 서버측 메모리의 소모가 발생하게 됨
  - Token은 일반적으로 Session ID 보다 김
  - XSS 공격에 취약할 수 있어 가능한 민감한 정보는 포함시키지 않아야 함

<br>

### JWT ( Json Web Token )

`JWT(Json Web Token)`은 토큰 기반 인증 방식으로, 클라이언트의 세션 상태를 저장하는 게 아니라 필요한 정보를 토큰 body에 저장해 클라이언트가 가지고 있고 그것을 증명서처럼 사용한다.

- `xxx.yyyy.zzzz`
  - **Header** (`xxxxx`) 
    -  JWT인 토큰의 유형이나 HMAC SHA256 또는 RSA와 같이 사용되는 해시 알고리즘이 무엇으로 사용했는지 등 정보가 담긴다. Base64Url로 인코딩되어있다.
  - **Payload** (`yyyyy`)
    - 클라이언트에 대한 정보나, meta Data같은 내용이 들어있고, Base64Url로 인코딩되어있다.
  - **Signature** (`zzzzz`)
    - header에서 지정한 알고리즘과 secret 키, 서명으로 payload와 header를 담는다.

<br>

## ✨ JPA 기본키 매핑법

> https://ithub.tistory.com/24
>
> https://gmlwjd9405.github.io/2019/08/12/primary-key-mapping.html

<br>

###  기본 키 매핑 방법

Spring Data JPA 에서는 엔티티의 기본키를 @Id 어노테이션을 사용하여 설정한다.

~~~
@Entity
public class Test {

@Id @GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "Test_id")
private Long id;

}
~~~

이 때, 기본키를 할당하는 방법으로 두가지 방법이 있다.

- 직접 할당 
  - 기본키를 어플리케이션에서 직접 할당 해주는 방법
  - `@Id` 만 사용
- 자동생성
  - 데이터베이스가 자동으로 할당해주는 방법 (ex - oracle의 sequence)
  - `@Id` 와 `@GeneratedValue` 를 같이 사용



### 기본키 자동 생성 전략

기본 키를 직접 할당하기 위해서는 @Id 어노테이션만 사용하면 되고, 자동 생성 전략을 사용하기 위해서는 @Id에 @GeneratedValue를 추가하고 원하는 키 생성 전략을 선택하면 된다.

- **IDENTITY **
  - 기본 키 생성을 데이터베이스에 위임(의존)
  - 즉, id 값을 null로 하면 DB가 알아서 AUTO_INCREMENT 해줌
  - MySQL, PostressSQL, SQL Server, DB2 에서 사용
- **SEQUENCE**
  - 데이터베이스 시퀀스를 사용해서 기본 키를 할당(의존)
  - `@SequenceGenenrator`를 사용하여 시퀀스 생성기를 등록하고 실제 데이터베이스에 생성될 시퀀스 이름을 지정할 수 있음
  - Oracle, DB2, H2에서 사용
- **TABLE**
  - 키 생성 테이블을 사용
  - 키 생성 전용 테이블을 하나 만들고, 이름과 값으로 사용할 컬럼을 만드는 방법
  - 테이블을 사용하므로 데이터베이스 벤더에 상관 없이 모든 데이터베이스에 적용이 가능함
- **AUTO**
  - 데이터베이스 벤더에 의존하지 않고 기본키를 할당하는 방법
  - 데이터베이스에 따라서 IDENTITY, SEQUENCE, TABLE 방법 중 하나를 자동으로 선택해줌



