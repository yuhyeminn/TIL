### Node.js Basic Module

> 윤재성의 Node.js 서버 프로그래밍 과정 강의 노트



#### 모듈

- js파일이 하나의 모듈이 되며 이는 하나의 객체 단위
- 자주 사용하는 함수의 경우 별도의 js파일에 만들면 됨
- exports 객체에 필요한 함수를 추가

~~~javascript
/* second. js */
exports.func = function(){
    console.log("f2 함수 호출")
}
~~~

- require 함수를 이용해 모듈 객체를 생성함
- 생성된 모듈 객체 이용하여 함수를 호출

~~~javascript
/* main.js */
var test = require("./second.js");

/* 모듈 객체 이용하여 함수 호출 */
test.func();
~~~



------



#### Assert 모듈

개발자가 만든 코드가 동작하기 전에 데이터나 수식에 대한 검사를 할 수 있는 모듈

Assert 모듈에서 제공하고 있는 함수들을 이용하여 검사할 때 위배가 될 경우 오류가 발생하고 프로그램이 중지됨

- 모듈을 생성하여 사용함

~~~javascript
/* 모듈 생성 */
var assert = require("assert");
~~~



------



#### Buffer 모듈

기억공간을 동적으로 만들 때 사용하는 모듈

JavaScript에는 자료형이 따로 존재하지 않기 때문에, 원하는 사이즈의 메모리 공간을 사용하고자 한다면 Buffer 모듈을 이용해 동적으로 기억공간을 만들어 사용함

* 모듈 생성 없이 사용
* 데이터를 1바이트씩 분리하여 저장함



------



#### Cluster 모듈

병렬처리를 위해 사용되는 모듈이며, 하나의 작업단위는 worker

cluster 모듈 생성 후 fork 메서드를 호출하면 worker 하나가 생성됨

보통 cpu 코어의 개수 만큼 worker를 발생시켜 병렬처리를 함

~~~javascript
/* 모듈 생성 */
var cluster = require("cluster");

// 스케쥴링 방식 세팅. Round Robin 방식으로 스케쥴링
cluster.schedualingPolicy = cluster.SCHED_RR;
~~~



---



#### crypto 모듈

데이터 암호화 기능을 제공하는 모듈

현재 존재하는 대부분의 암호화 알고리즘을 지원하고 있음

~~~javascript
/* 모듈 생성 */
var crypto = require("crypto");
~~~



---



#### dns 모듈

지정된 도메인의 dns 정보를 알아올 수 있는 모듈

-  ip주소 등의 정보를 파악할 수 있음

* https://nodejs.org/dist/latest-v6.x/docs/api/dns.html

~~~javascript
/* 모듈 생성 */
var dns = require("dns");
~~~



---



#### fs 모듈

파일에 데이터를 쓰고 읽어올 수 있는 기능을 제공하는 모듈

- 동기/비동기 방식 제공

~~~javascript
/* 모듈 생성 */
var fs = require("fs");
~~~



---



#### Global 모듈

모듈을 생성하지 않고 사용할 수 있는 것들을 가지고 있는 모듈 객체

프로그램 시작과 동시에 생성되며 어디서든 사용이 가능함

- Buffer모듈 , console, require, exports 등 포함



---



#### os 모듈

node.js 프로그램이 실행되고 있는 서버 컴퓨터와 관련된 정보를 제공함



---



#### path 모듈

경로에 관련된 기능 제공

경로에 대해 여러 작업이 필요한 경우 사용함



---



#### http 모듈

웹 어플리케이션을 개발할 수 있도록 제공되는 모듈

일반적인 웹서버와 동일하게 동작하며 웹 서버의 기능을 할 수 있는 모듈



