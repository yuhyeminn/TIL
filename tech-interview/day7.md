# 💣day7 (2021/01/22)

<br>

## ✨ 동기/비동기와 블로킹/논블로킹

>https://musma.github.io/2019/04/17/blocking-and-synchronous.html
>
>https://victorydntmd.tistory.com/8
>
>https://deveric.tistory.com/99

<br>

### 동기(Synchronous)와 비동기(Asynchronous)

동기와 비동기 개념은 **작업을 수행하는 주체**가 두개 이상이어야 한다. 이 때 두 주체가 서로 동시에 수행하거나, 동시에 끝나거나 끝나는 동시에 시작하는 경우를 `동기`, 두 주체가 서로의 시작-종료시간과 관계 없이 별도의 수행 시간을 가지고 있을 때 `비동기`라고 한다.

`동기`는 요청과 결과가 동시에 일어난다는 뜻으로, 어떤 객체 또는 함수 내부에서 다른 함수를 호출 했을 때 **호출된 함수의 결과를 호출한 쪽에서도 처리**하면 동기라고 한다.

`비동기`는 요청과 결과가 동시에 일어나지 않으며, 동기와 달리 **호출된 함수의 결과를 호출한 쪽에서 처리하지 않는다.**



### 블로킹(Blocking)과 논블로킹(Non-Blocking)

블로킹과 논블로킹은 **다른 작업을 수행하는 주체를 어떻게 상대하는 지**가 중요하다. 호출한 함수측 관점으로 보면, 자신의 작업을 하다가 다른 작업 주체가 하는 작업의 시작부터 끝까지 기다렸다가 다시 자신의 작업을 시작한다면 이는 `블로킹`이고, 다른 주체의 작업과 관계 없이 자신의 작업을 계속한다면 이를 `논블로킹`이라고 할 수 있다.

`블로킹`은 호출된 함수가 자신이 할 일을 모두 마칠 때까지 제어권을 계속 가지고서 호출한 함수에게 바로 돌려주지 않는 것이다.

`논블로킹`은 호출된 함수가 자신의 작업이 끝나지 않았음에도 제어권을 바로 자신을 호출한 쪽으로 건네주어 호출한 함수가 다른 작업을 계속 진행할 수 있도록 하는 것이다.



<br>

## ✨ 웹의 동작 방식

> https://velog.io/@junnoli/%EC%9B%B9%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC

![img](https://media.vlpt.us/images/junnoli/post/20139313-0a41-4f23-9ff9-ab74ceddb39e/image.png)

- ①, ② : 사용자가 브라우저에 검색하고자 하는 URL을 입력

- ③ : 브라우저가 URL 주소 중 도메인 네임을  DNS서버에 검색

  - DNS : 도메인을 컴퓨터가 처리할 수 있는 숫자로 된 IP주소로 바꾸는 시스템 혹은 이런 역할을 하는 서버 컴퓨터

  - DNS 동작 원리 

    EX ) 브라우저에 www.naver.com 입력

    ![img](https://media.vlpt.us/images/doomchit_3/post/77b59702-69d4-433a-81bc-52d93aa75e83/Netmanias.2011.12.12-DNS_Basic.gif)

    1. `Local DNS`에 해당 URL의 IP주소를 요청
    2. `Local DNS`에 해당 IP주소가 존재한다면 바로 응답, 그렇지 않다면 다른 DNS 서버와 통신함. 먼저 `Root DNS`서버에게 해당 URL의 IP주소를 요청함
    3. `Root DNS`서버에 해당 IP주소가 없다면 하위 DNS 서버에 요청하라고 응답함. 이 응답을 받은 `Local DNS`는 com 도메인을 관리하는 DNS서버에 같은 내용 요청
    4. `com 도메인 관리하는 DNS 서버`에도 해당 IP주소가 없다면 또 다시 하위 서버에 요청하라고 응답함.  이 응답을 받은 `Local DNS`는 `naver.com 도메인을 관리하는 DNS 서버`에 같은 내용을 요청함
    5. `naver.com DNS 서버`는 IP주소가 있기 때문에 해당 URL의 IP주소에 대한 응답을 함
    6. 이를 수신한 `Local DNS`는 해당 IP주소를 캐싱하고 브라우저에 응답함

  - 이와 같이 Local DNS 서버가 여러 DNS 서버에 차례대로 (Root DNS 서버 -> com DNS 서버 -> naver.com DNS 서버) 요청하여 그 답을 찾는 과정을 **Recursive Query** 라고 함

- ④ : DNS서버에서 해당 도메인 네임에 해당하는 IP주소를 찾아 사용자가 입력한 URL정보와 함께 전달

- ⑤, ⑥ : 웹 페이지 URL정보와 전달받은 IP주소는 HTTP 프로토콜을 사용하여 HTTP요청 메시지를 생성

- ⑦ : 도착한 HTTP 요청 메시지는 웹 페이지 URL 정보로 변환되어 웹서버에 전달됨

- ⑧ : 웹 서버는 도착한 웹 페이지 URL 정보에 해당하는 데이터를 검색함

- ⑨, ⑩ : 검색된 웹 페이지 데이터는 또 다시 HTTP 프로토콜을 사용하여 HTTP 응답 메시지로 변환

- ⑪ : 도착한 HTTP 응답 메시지는 웹 페이지 데이터로 변환됨

- ⑫ : 변환된 웹 페이지 데이터는 웹 브라우저에 의해 출력되어 사용자가 볼 수 있게 됨

<br>

## ✨ 자바에서 iterator와 iterable 차이

> https://girawhale.tistory.com/entry/JAVA-Iterable%EA%B3%BC-Iterator

<br>

### Iterable

`Iterable`은 순회할 수 있는 컬렉션을 나타낸다. `Collection` 인터페이스의 상위 인터페이스가 `Iterable`이기 때문이다. `Iterable` 인터페이스에서는 `Iterator`를 반환하는 `iterator()` 메소드가 정의되어있으며, 이를 구현하는 클래들은 강제적으로 이 메소드를 구현해야함으로써 `for-each`와 `iterator()`를 사용할 수 있게 되는 것이다.



### Iterator

`Iterator` 인터페이스는 Collection과는 별개로 존재하는 인터페이스이다. `Iterator`는 Collection에 저장된 요소를 읽어오는 것을 표준화한 것이고, 데이터를 하나씩 읽을 때 사용한다. 데이터는 `hasNext()`, `next()` 메소드를 이용해 접근할 수있다.



### Iterable과 Iterator

`Iterable`은 구현 클래스에서 `iterator()` 메소드를 통해 `Iterator`의 생성을 강제하는 역할을 하게 된다. 따라서 Iterable을 상속받은 Collection의 하위 클래스들은 모두 `iterator()`를 가지고 있게 되며 `Iterator`는  `hasNext()`, `next()`등을 구현하고 있기 때문에 이를 활용할 수 있게 되는 것이다.

<br>

## ✨ 자바에서 제네릭이란

> https://2dubbing.tistory.com/17
>
> https://yulsfamily.tistory.com/110

<br>

### 제네릭이란?

`제네릭`이란 클래스에서 사용할 타입을 클래스 외부에서 설정하는 것이며 `클래스<사용할타입>`으로 설정한다. 제네릭 타입으로는 참조형 데이터타입만 사용가능하여, 기본타입의 경우 래퍼클래스를 이용하여 설정합니다.

- 특징

  - 컴파일 시 타입 체크가 가능하고, 실행 시 타입 에러가 나는 것을 방지할 수 있음

  - 멀티 타입의 파라미터도 사용이 가능함

  - 내부에서 사용할 타입을 외부에서 받아들어올 때 들어올 수 있는 타입을 제한 할 수 있음

  - 타입 인자

    | 타입 인자 |  의미   |
    | :-------: | :-----: |
    |   **E**   | Element |
    |   **K**   |   Key   |
    |   **N**   | Number  |
    |   **T**   |  Type   |
    |   **V**   |  Value  |
    |   **R**   | Result  |

    