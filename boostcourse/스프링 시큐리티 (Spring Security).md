### 스프링 시큐리티 (Spring Security)



#### 스프링 시큐리티(Spring Security) 란?

- 스프링 기반의 어플리케이션의 보안(인증과 권환)을 담당하는 프레임워크
- 보안과 관련하여 체계적으로 많은 옵션들을 지원해줌
- 필터(Filter)기반으로 동작하기 때문에 스프링 MVC와 분리되어 관리 및 동작됨
- 스프링 시큐리티 3.2부터는 xml로 설정하지 않고 자바 config설정으로 간단하게 설정 할 수 있도록 지원함



> 자주사용하는 보안 용어
>
> - 접근 주체(Principal) : 보호된 대상에 접근하는 유저
> - 인증(Authentication) : '증명하다'라는 의미. 예를 들어 유저 아이디와 비밀번호를 이용해 로그인하는 과정
> - 인가(Authorization) : '권한 부여'나 '허가'와 같은 의미로 사용. 즉, 어떤 대상이 특정 목적을 실현하도록 허용하는 것을 의미함
> - 권한 : 인증된 주체가 애플리케이션의 동작을 수행할 수 있도록 허락되었는지를 결정할 때 사용



#### 스프링 시큐리티 필터 (Spring Security Filter)

* SecurityContextPersistenceFilter : SecurityContextRepository에서 SecurityContext를 가져오거나 저장하는 역할을 함
*  LogoutFilter : 설정된 로그아웃 URL로 오는 요청을 감시하며, 해당 유저를 로그아웃 처리
* (UsernamePassword)AuthenticationFilter : (아이디와 비밀번호를 사용하는 form 기반 인증) 설정된 로그인 URL로 오는 요청을 감시하며, 유저 인증 처리
  1. AuthenticationManager를 통한 인증 실행
  2. 인증 성공 시, 얻은 Authentication 객체를 SecurityContext에 저장 후 AuthenticationSuccessHandler 실행
  3. 인증 실패 시, AuthenticationFailureHandler 실행
* DefaultLoginPageGeneratingFilter : 인증을 위한 로그인폼 URL을 감시한다.
* BasicAuthenticationFilter : HTTP 기본 인증 헤더를 감시하여 처리한다
* RequestCacheAwareFilter : 로그인 성공 후, 원래 요청 정보를 재구성하기 위해 사용된다.
* SecurityContextHolderAwareRequestFilter : HttpServletRequestWrapper를 상속한 SecurityContextHolderAwareRequestWapper 클래스로 HttpServletRequest 정보를 감싼다. Security ContextHolderAwareRequestWrapper 클래스는 필터 체인상의 다음 필터들에게 부가정보를 제공한다.
* AnonymousAuthenticationFilter : 이 필터가 호출되는 시점까지 사용자 정보가 인증되지 않았다면 인증토큰에 사용자가 익명 사용자로 나타난다.
* SessionManagementFilter : 이 필터는 인증된 사용자와 관련된 모든 세션을 추적한다.
* ExceptionTranslationFilter : 이 필터는 보호된 요청을 처리하는 중에 발생할 수 있는 예외를 위임하거나 전달하는 역할을 한다.
* FilterSecurityInterceptor : 이 필터는 AccessDecisionManager 로 권한부여 처리를 위임함으로써 접근 제어 결정을 쉽게해준다.

