### MySQL 기본 명령어



#### 관리자계정으로 접속

~~~mysql
mysql -uroot -p
~~~



#### 데이터베이스 생성

~~~mysql
create database DB이름;
~~~



#### 데이터베이스 계정 생성

~~~mysql
create user '사용자'@'localhost' identified by '비밀번호';
create user '사용자'@'%' identified by '비밀번호';
~~~



#### 권한 부여

~~~mysql
grant all privileges on db이름.* to '계정이름'@'%';
grant all privileges on db이름.* to '계정이름'@'localhost';
flush privileges;
~~~



#### 계정 삭제

~~~mysql
drop user '사용자'@'localhost';
drop user '사용자'@'%';
~~~



#### 생성한 DB에 접속하기

~~~mysql
mysql -h 호스트명 -u DB계정명 -p 데이터베이스이름
~~~



#### 접속 종료

`exit` 또는 `quit` 입력



#### 쿼리 작성 도중 취소

 `\c` 입력



#### DBMS에 존재하는 데이터베이스 확인

~~~mysql
show databases;
~~~



#### 데이터베이스 전환하기

데이터베이스를 전환하려면 이미 데이터베이스가 존재해야하며, 현재 접속중인 계정이 해당 DB를 사용할 수 있는 권한이 있어야 함.

~~~mysql
use DB이름;
~~~



#### 현재 DB에 존재하는 테이블 목록

~~~mysql
show tables;
~~~







