/**
 * assert.js
 */

// 모듈 생성
var assert = require("assert");

var v1 = 10;
var v2 = 10;
var v3 = 20;
var v4 = '10';

/* assert 
	: 주어진 변수가 수식의 값이 0이거나 false인 경우 오류가 발생함. */ 
assert(v1 < v3);
console.log("v1은 v3보다 작습니다.");

// assert(v1==v3);
// console.log("v1은 v3과 같습니다.")

assert(v1 == v2);
console.log("v1과 v2는 같습니다.");

// assert(v1 - v2);
// console.log("v1 - v2는 0이 아닙니다.");

assert(v1 - v3);
console.log("v1 - v3은 0이 아닙니다.");


/* equal 
	: 주어진 두 변수나 수식의 결과 값이 다를 경우 오류 발생. 값의 타입 무시 */
assert.equal(v1, v2);
console.log("v1과 v2는 같습니다.");

// assert.equal(v1, v3);
// console.log("v1과 v3는 같습니다.");

// 타입을 무시하고 검사하기 때문에 같다고 판단
assert.equal(v1, v4);
console.log("v1과 v4는 같습니다.");


/* stricEqual
	: 주어진 두 변수나 수식의 결과 값이 다를 경우 오류 발생. 값의 타입 검사 */
// ERROR - 타입이 다르기 때문에 오류 발생
// assert.strictEqual(v1, v4);
// console.log("v1과 v4는 같습니다.");


/* notEqual
	: 주어진 두 변수나 수식의 결과 값이 같을 경우 오류 발생. 값의 타입 무시 */
assert.notEqual(v1, v3);
console.log("v1과 v2는 다릅니다.");

// ERROR
// assert.notEqual(v1, v4);
// console.log("v1과 v2는 다릅니다.");


/* notStrictEqual
	: 주어진 두 변수나 수식의 결과 값이 같을 경우 오류 발생. 값의 타입 검사 */
assert.notStrictEqual(v1, v4);
console.log("v1과 v4는 다릅니다.");

/* ---------------------------------------------- */

var obj1 = {
	a1 : 10,
	a2 : 20
};

var obj2 = {
	a1 : 10,
	a2 : 20
};

var obj3 = {
		a1 : 10,
		a2 : 30
};

var obj4 = {
		a1 : 10,
		a2 : '20'
};

/* deepEqual
	: 두 객체의 멤버가 동일하지 않을 경우 오류 발생. 값의 타입 무시 */
assert.deepEqual(obj1, obj2);
console.log("obj1과 obj2는 같습니다.");

// assert.deepEqual(obj1, obj3);
// console.log("obj1과 obj3는 같습니다.");

assert.deepEqual(obj1, obj4);
console.log("obj1과 obj4는 같습니다.");


/* deepStrictEqaul 
	: 두 객체의 멤버가 동일하지 않을 경우 오류 발생. 값의 타입 검사*/
// assert.deepStrictEqual(obj1, obj4);
// console.log("obj1과 obj4는 같습니다.");


/* notDeepEqual 
	: 두 객체의 멤버가 동일할 경우 오류 발생. 값의 타입 무시 */
// assert.notDeepEqual(obj1, obj2);
// console.log("obj1과 obj2는 다릅니다.");

assert.notDeepEqual(obj1, obj3);
console.log("obj1과 obj3은 다릅니다.");

// assert.notDeepEqual(obj1, obj4);
// console.log("obj1과 obj4는 다릅니다.");

/* notDeepStrictEqual 
	: 두 객체의 멤버가 동일할 경우 오류가 발생. 값의 타입 검사 */
// assert.notDeepStrictEqaul(obj1, obj4);
// console.log("obj1과 obj4는 다릅니다.");




















