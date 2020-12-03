### Node.js Express Module

> 윤재성의 Node.js 서버 프로그래밍 과정 강의 노트



#### 외부 모듈 사용하기

node.js에서 제공하는 기본 모듈만으로는 개발하기에 충분하지 않음.

node.js는 오픈 소스 플랫폼으로 소스가 공개되어 있어 전 세계 개발자들의 외부 모듈을 사용할 수 있음.

- 모듈은 http://www.npmjs.com 에서 검색
- 외부 모듈 수동 설치 cmd 명령어 : `npm install <모듈이름>`
  - ex ) cmd창에서 특정 위치에 arraylist 모듈 설치
    1. cmd창 열기
    2. ` $ cd 외부 모듈 설치할 경로` 
    3. `$ npm install arraylist` 명령어 입력하면 해당 경로에 모듈 설치 완료

- eclipse에 package.json 파일 이용하여 설치

  ** package.json 파일은 node.js 프로그램 개발 시 사용하는 외부 모듈을 기록하고 한번에 설치할 수 있도록 관리하는 파일

  - ex ) eclipse 프로젝트에 arraylist 모듈 설치하기

    1. 프로젝트에서 `New`-`JavaScript`-`npm init` 으로 package.json 생성

    2. dependencies에 arraylist 모듈 추가. 버전은 "*"로 설정할 경우 가장 최신 버전이 설치됨.

    3. pakage.json파일 `Run` - `Run As` - `npm install` 로 설치

       ~~~json
       {
         "name": "ExternalModule",
         "version": "0.0.0",
         "private": true,
         "dependencies": {
           "arraylist": "*"
         }
       }
       ~~~

    

---



#### express 모듈

웹 애플리케이션을 개발할 때 가장 많이 사용되고 있는 외부 모듈

http 모듈에 비해 많은 기능을 갖추고 있어 보다 손쉽게 웹 애플리케이션을 개발할 수 있게 됨

express 모듈은 jade, ejs 등과 같은 동적 웹 페이지 파일을 지원하고있어 보다 쉽게 애플리케이션 개발이 가능함



#### 라우팅

사용자 요청에 따라 응답 결과를 달리 전달하는 것을 라우팅이라고 함

~~~javascript
app.get("/", function(req, res){});
app.get("/test", function(req, res{}));
~~~

웹 개발 시 이런 작업을 굉장히 많이 하게 되는데, 하나의 파일에 작성을 하면 유지보수 시에 어려울 수 있음

-> js파일을 만들어 작성하면 파일을 분리할 수 있기 때문에 관리하기가 용이해짐



#### html 렌더링

html 코드를 send할 때, html 코드의 양이 늘어날 경우 개발에 어려움을 줌. 

렌더링을 통해 외부 파일의 데이터를 읽어와 html 코드로 만든 다음 클라이언트에게 전달함

* ejs 모듈을 사용하여 렌더링 

  ```javascript
  // 1. 모듈 객체 생성 
  var ejs = require("ejs");
  
  // 2. html 파일을 만들어 놓을 폴더 지정
  app.set("views", __dirname + "/views");
  
  // 3. 렌더링에 사용할 모듈 지정
  app.set("view engine", "ejs");
  
  // 4. html일 경우 사용할 ejs 모듈 지정
  app.engine("html", ejs.renderFile);
  ```

  html 문서에서 css, js, imag, 동영상, 사운드 등의 파일들을 사용할 때는 정적 파일이 위치하는 폴더를 지정하여 사용할 수 있음.

  ~~~javascript
  //html파일 내에서의 정적 파일들의 위치를 public폴더내에서 찾음.
  app.use(express.static("public"));
  ~~~

  

#### 동적 웹 페이지

express 모듈에서 렌더링 모듈을 사용하면 동적 웹페이지를 만들 수 있음.

렌더링 모듈은 jade, ejs 등 다양하게 존재함. ( jade의 경우 html을 jade문서로 변경해야하는 번거로움이 있기 때문에 ejs 모듈을 이용하여 실습)

ejs모듈 사용은 jsp와 흡사함



#### 요청 방식

get방식은 서버로 전달할 데이터가 주소창에 모두 나타나며 post방식은 숨겨저서 전달됨

form 태그에서 method를 post로 줄 때를 제외한 나머지 모든 경우는 get방식에 해당함



#### 파라미터

클라이언트가 서버에 요청할 때 전달하는 데이터

express에서 파라미터는 request 객체를 통해 추출이 가능함

get 방식의 경우 query라는 객체 안에 들어있음

post 방식의 경우 bodyParser 모듈을 이용해야 파라미터를 추출 할 수 있음



#### 쿠키

클라이언트 측에 저장되는 데이터

클라이언트가 서버에 요청할 때 쿠키 정보를 전부 전달하게 됨. 이를 통해 서버에서 사용자 컴퓨터에 저장된 쿠키 정보를 사용할 수 있게 됨

쿠키는 사용자 컴퓨터에 저장되므로 브라우저를 닫아도 데이터가 유지됨.

express에서는 cookie-parser 모듈을 이용하여 쿠키 관리



#### 세션

서버 메모리에 데이터를 저장하는 방식으로 브라우저 하나당 하나의 공간이 할당됨

브라우저를 닫으면 세션은 삭제됨

express에서 세션을 관리할 때 express-session 모듈 사용



---



#### 데이터베이스 연동하기

1. 사용할 DBMS 모듈 설치하기 ( mysql 사용 )

2. 데이터베이스 접속을 위해 접속 정보를 가지고 있는 객체 만들기

   ~~~javascript
   var conn_info = {
   	host : "접속 주소",
   	port : 포트번호,
   	user : "아이디",
   	password : "비밀번호",
   	database : "데이터베이스 이름"
   };
   ~~~

3. 데이터베이스 접속

   ~~~java
   var conn = mysql.createConnection(conn_info);
   
   conn.connect(function(error){
       if(error){
           console.log("접속 오류");
       } else {
           console.log("접속 성공");
       }
   })
   ~~~

4. 쿼리 실행

   ~~~javascript
   conn.query(쿼리문, [파라미터], [callback함수]);
   
   // ex ) TestTable에 데이터 insert
   var sql = "insert into TestTable (int_data, str_data) values (?, ?)";
   var input_data1 = [100, "문자열1"];
   conn.query(sql, input_data1, function(error){
        console.log("저장완료1");
   });
   ~~~

5. 접속 종료

   ~~~javascript
   conn.end();
   ~~~

   

---



#### 방명록 프로젝트

mysql 연동한 간단한 방명록 만들기 실습

