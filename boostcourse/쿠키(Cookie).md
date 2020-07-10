### 쿠키(Cookie)



#### 정의

- 클라이언트 단에 저장되는 작은 정보의 단위
- 클라이언트에서 생성하고 저장될 수 있고, 서버단에서 전송한 쿠키가 클라이언트에 저장될 수 있음
- 쿠키는 수와 크기에 제한이 있음
  - 하나의 쿠키는 4K Byte로 제한
  - 브라우저는 각각의 웹사이트당 20개의 쿠키를 허용
  - 모든 웹사이트를 합쳐 최대 300개 허용
  - 클라이언트당 쿠키의 최대 용량은 1.2M Byte



#### 이용 방법

- 서버에서 클라이언트의 브라우저로 전송되어 사용자의 컴퓨터에 저장
- 저장된 쿠키는 다시 해당하는 웹 페이지에 접속할 때, 브라우저에서 서버로 쿠키를 전송함
- 쿠키는 이름(name)과 값(value)으로 구성된 자료를 저장
  - 이름과 값 이외에도 주석(comment), 경로(path), 유효기간(maxage, expiry), 버전(version), 도메인(domail)과 같은 추가적인 정보를 저장함



#### javax.servlet.http.Cookie

- 서버에서 쿠키 생성, Response의 addCookie메소드를 이용하여 클라이언트에게 전송함

  ~~~java
  Cookie cookie = new Cookie(이름, 값);
  response.addCookie(cookie);
  ~~~

  - 쿠키는 (이름, 값)의 쌍 정보를 입력하여 생성함.

  - 쿠키의 이름은 알파벳과 숫자로만 구성되어야 함.

    쿠키의 값에 공백, 괄호, 등호, 콤마, 콜론, 세미콜론 등은 포함 불가능.

- 클라이언트가 보낸 쿠키 정보 읽기

  ~~~java
  Cookie[] cookies = request.getCookies();
  ~~~

  - 쿠키 값이 없을 경우 null 반환됨

- Cookie가 가지고 있는 getName()과 getValue()메소드를 이용하여 원하는 쿠키 정보를 찾아 사용



##### 클라이언트에게 쿠키 삭제 요청

~~~java
Cookie cookie = new Cookie("이름", null);
cookie.setMaxAge(0);
response.addCookie(cookie);
~~~

- 쿠키를 삭제하는 명령은 없음.
- maxAge가 0인 같은 이름의 쿠키를 전송함. (같은 이름의 쿠키는 존재 할 수 없음)



##### 쿠키의 유효기간 설정

- 메소드 setMaxAge()
  - 인자는 유효기간을 나타내는 초 단위의 정수형
  - 유효기간을 0으로 지정하면 쿠키 삭제와 같음
  - 음수를 지정하면 브라우저가 종료될 때 쿠키가 삭제됨
- 유효기간 10분 `cookie.setMaxAge(10 * 60); //초 단위 : 10분`
- 유효기간 1주일 `cookie.setMaxAge(7*24*60*60)`  



##### Cookie 객체의 메소드

+ `int getMaxAge()` : 쿠키의 유효기간 반환

+ `String getName()` : 쿠키의 이름을 String으로 반환

+ `String getValue()` : 쿠키의 값을 String으로 반환

+ `void setValue(String newValue)` : 쿠키에 새로운 값(newValue)을 설정

  

#### Spring MVC에서의 Cookie 사용

- @CookieValue 애노테이션(annotation)사용

  - 컨트롤러 메소드의 파라미터에서 `@CookieValue`을 사용함으로써 원하는 쿠키정보를 파라미터 변수에 담아 사용할 수 있음.

  ~~~java
  methodName(@CookieValue(value="쿠키이름", required=false, defaultValue="기본값") String 변수명)
  ~~~

  

