/**
 * path.js
 */

var path = require("path");

// basename : 주어진 경로에서 파일 이름을 반환
var basename1 = path.basename("c:\\abc\\abc.txt");
console.log("basename1 : ", basename1);

var basename2 = path.basename("c:/abc/abc.txt");
console.log("basename2 : ", basename2);

var basename3 = path.basename("abc.txt");
console.log("basename3 : ", basename3);


// dirname : 파일 이름을 제외한 파일 경로를 반환
var dirname1 = path.dirname("c:/abc/abc.txt");
console.log("dirname1 : ", dirname1);

var dirname2 = path.dirname("abc.txt");
console.log("dirname2 : ", dirname2);	// . -> 현재 폴더


// extname : 파일의 확장자명 반환
var extname1 = path.extname("c:/abc/abc.txt");
console.log("extname1 : ", extname1);

var extname2 = path.extname("abc.txt");
console.log("extname2 : ", extname2);


// isAbsolute : 주어진 경로가 절대 경로인지 확인하여 true/false값 반환
var isAbsolute1 = path.isAbsolute("c:/abc/abc.txt");	//os에 관계없이 대응할 수 있음
var isAbsolute2 = path.isAbsolute("abc.txt");
var isAbsolute3 = path.isAbsolute("c:\\abc\\abc.txt");
console.log("isAbsolute1 : ", isAbsolute1);
console.log("isAbsolute2 : ", isAbsolute2);
console.log("isAbsolute3 : ", isAbsolute3);


// join : 주어진 문자열 이어붙여 경로를 생성
var join = path.join("aaa", "ccc.txt");
console.log("join : ", join);


// normalize : 경로를 정리하여 반환함
var normalize = path.normalize("c:\\aaa\\..\\bbb\\ccc.txt");
console.log("noramlize : " , normalize);


