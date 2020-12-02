/**
 * fs.js
 */

var fs = require("fs");

/* 
writeFile : 비동기식으로 파일에 데이터를 씀. 
			파일이 없으면 새롭게 만들며 파일이 있으면 기존 데이터를 삭제하고 씀 
			명령을 던지고 다음으로 넘어가기 때문에 어떤 작업이 먼저 끝날지 예측할 수 없음 
*/
fs.writeFile("data1.txt", "Hello node.js", function(error){
	console.log("비동기식 저장1");
});

fs.writeFile("data2.txt", "Hello node.js", function(error){
	console.log("비동기식 저장2");
});



/* 
appedFile : 비동기식으로 파일에 데이터를 씀.
			파일이 없으면 새롭게 만들며 파일이 있으면 기존 데이터 뒤에 추가로 씀
*/
fs.appendFile("data1.txt", "안녕하세요", function(error){
	console.log("비동기식 추가1");
});
fs.appendFile("data2.txt", "반갑습니다", function(error){
	console.log("비동기식 추가2");
});



/* 
readFile : 비동기식으로 파일의 데이터를 읽어옴
*/
fs.readFile("data1.txt", function(error, data){
	console.log("data1 : ", data);	//버퍼에 저장돼서 반환됨
	console.log("data1 : ", data.toString());	
});

fs.readFile("data2.txt", function(error, data){
	console.log("data2 : ", data.toString());
});



/* 
writeFileSync : 동기식으로 파일에 데이터를 씀
 			 	파일이 없으면 새롭게 만들며 파일이 있으면 기존 데이터를 삭제하고 씀
 			 	명령 수행이 끝날 때까지 기다린 후에 다음 명령을 실행하기 때문에 별도의 callback 함수 작성하지 않음.
*/
fs.writeFileSync("data3.txt", "Hello node.js");
console.log("동기식 저장1");

fs.writeFileSync("data4.txt", "Hello node.js");
console.log("동기식 저장2");



/*
appendFileSync : 동기식으로 파일에 데이터를 씀.
					파일이 없으면 새롭게 만들며 파일이 있으면 기존 데이터 뒤에 추가로 씀
*/
fs.appendFileSync("data3.txt", "안녕하세요");
console.log("파일 내용 추가1");

fs.appendFileSync("data4.txt", "반갑습니다");
console.log("파일 내용 추가2");



/* readFileSync : 동기식으로 파일의 데이터를 읽어옴 */
var data3 = fs.readFileSync("data3.txt");
console.log("data3 : ", data3.toString());

var data4 = fs.readFileSync("data4.txt");
console.log("data4 : ", data4.toString());
