/**
 * global.js
 */

// __dirname : 현재 실행중인 파일의 경로를 가지고 있음
console.log("__dirname : ", __dirname);

// __ filename : 현재 실행중인 파일의 경로와 파일명을 가지고 있음
console.log("__filename : ", __filename);

// setImmediate : 하나의 사건처리가 끝나면 동작할 코드를 등록함
console.log("node.js 코드 입니다.");
setImmediate(function(){
	console.log("Immediate 동작 1");
});

console.log("node.js 코드 입니다.");
var a1 = setImmediate(function(){
	console.log("Immediate 동작 2");
});

console.log("node.js 코드 입니다.");

// clearImmediate : 등록된 Immediate를 제거함
clearImmediate(a1);


// setInterval : 주어진 함수를 주어진 시간마다 계속 호출함
//clearInterval : 등록된 Interval을 제거함
var a1 = 0;
var a2 = setInterval(function(){
	console.log("interval 동작");
	a1++;
	console.log("a1 : ", a1);
	if(a1 >= 5){
		clearInterval(a2);
	}
}, 1000);


// setTimeout : 주어진 함수를 주어진 시간 후에 한번 호출함
// clearTimeout : 등록된 Timeout을 제거함
var a3 = setTimeout(function(){
	console.log("timeout 동작");
}, 1000);

clearTimeout(a3);	//바로 제거했기 때문에 a3동작 안함.


/*
console : 화면 출력을 위한 객체
exports : 커스텀 모듈을 만들 때 사용하는 객체
require : 모듈 객체를 만드는 함수
*/

console.log("작업이 모두 완료되었습니다.");
