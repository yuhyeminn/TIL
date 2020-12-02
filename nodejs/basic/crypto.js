/**
 * crypto.js
 */

var crypto = require("crypto");

/* getCiphers : 지원하는 암호화 알고리즘 이름들을 반환함 */
var ciphers = crypto.getCiphers();

for(var x of ciphers){
	console.log(x);
}


// aes-256-cbc 이용하여 실습
// 데이터를 암호화하기 위해선 key값이 필요함. key값이 없으면 복호화 할 수 없음.
var key = "test key";
var data = "암호화 할 데이터";


/* createCipher : 암호화용 객체 생성 */
var cipher = crypto.createCipher("aes-256-cbc", key);

/* update : 데이터를 암호화 하거나 복호화 함 */
var result = cipher.update(data, "utf-8", "base64");

/* final : 암호화된 데이터에 마지막 종료 블럭을 추가함 */
result += cipher.final("base64");

console.log("암호화 문자열 : ", result);

/* createDecipher : 복호화용 객체 생성 */
var decipher = crypto.createDecipher("aes-256-cbc", key);
var result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf-8");

console.log("복호화 문자열 : ", result2);