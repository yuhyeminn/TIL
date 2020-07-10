### 세션(Session)



#### 정의

- 클라이언트별로 서버에 저장되는 정보

- 세션은 클라이언트가 서버에 접속하는 순간 생성됨

  - 특별히 지정하지 않으면 세션의 유지시간은 기본값으로 30분 설정
  - 세션의 유지시간이란 서버에 접속한 후 서버에 요청을 하지 않는 최대 시간
  - 30분 이상 서버에 전혀 반응을 보이지 않으면 세션이 자동으로 끊어짐.
  - 이 세션 유지 시간은 web.xml파일에서 설정 가능함

  ~~~java
  <session-config>
      <session-timeout>30</session-timeout>
  </session-config>
  ~~~

  

#### 이용 방법

- 웹 클라이언트가 서버측에 요청을 보내게 되면 서버는 클라이언트를 식별하는 session id를 생성
- 서버는 session id를 이용해서 key와 value를 이용한 저장소인 HttpSession을 생성
- 서버는 session id를 저장하고 있는 쿠키를 생성하여 클라이언트에 전송
- 클라이언트는 서버측에 요청을 보낼 때 session id를 가지고 있는 쿠키를 전송
- 서버는 쿠키에 있는 session id를 이용해서 그 전 요청에서 생성한 HttpSession을 찾고 사용함



#### javax.servlet.http.HttpSession

##### 세션 생성 및 얻기

~~~java
HttpSession session = request.getSession();
HttpSession session = request.getSession(true);
~~~

- request의 getSession()메소드는 서버에 생성된 세션이 있다면 세션을 반환하고 없다면 새롭게 세션을 생성하여 반환함. 새롭게 생성된 세션인지는 HttpSession이 가지고 있는 isNew()메소드를 통해 알 수 있음.

~~~java
HttpSession session = request.getSession(false);
~~~

- request의 getSession()메소드에 파라미터로 false를 전달했을 경우 이미 생성된 세션이 있으면 반환하고 없으면 null을 반환함



##### 세션에 값 저장

- setAttribute(String name, Object value)

  - name과 value의 쌍으로 객체 Object를 저장하는 메소드
  - 세션이 유지되는 동안 저장할 자료를 저장

  ~~~java
  session.setAttribute(이름, 값)
  ~~~



##### 세션에 값 조회

- getAttribute(String name) 메소드

  - 세션에 저장된 자료는 다시 getAttribute(String name) 메소드를 이용해 조회
  - 반환 값은 Object 유형이므로 저장된 객체로 자료형 변환이 필요
  - 메소드 setAttribute()에 이용한 name인 "id"를 알고 있다면 바로 다음과 같이 조회함

  ~~~java
  String value = (String) session.getAttribute("id");
  ~~~



##### 세션에 값 삭제

- removeAttribute(String name) 메소드
  - name값에 해당하는 세션 정보 삭제
- invalidate() 메소드
  - 모든 세션 정보를 삭제



##### Session 객체의 메소드

* `long getCreationTime()` : 세션이 생성된 시간까지 지난 시간을 계산하여 밀리세컨드로 반환
* `String getId()` : 세션에 할당된 유일한 식별자(ID)를 String 타입으로 변환
* `int getMaxInactiveInterval()` : 현재 생성된 세션을 유지하기 위해 설정된 최대 시간을 초의 정수형으로 반환, 지정하지 않으면 기본값은 1800초, 즉 30분이며 기본 값도 서버에서 설정 가능함.
* `boolean isNew()`  : 세션이 새로이 만들어졌으면 true, 이미 만들어진 세션이면 false를 반환