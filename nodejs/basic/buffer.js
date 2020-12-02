/**
 * buffer.js
 */

/* alloc : 지정된 바이트만큼 기억공간이 만들어지고 0으로 초기화 됨 */
var buf1 = Buffer.alloc(10); //10바이트 할당
console.log(buf1);


/* allocUnsafe : 지정된 바이트만큼 기억공간이 만들어지고 0으로 초기화 되지 않음. 
				 0으로 초기화하지 않기 때문에 alloc에 비해 속도가 빠름*/
var buf2 = Buffer.allocUnsafe(10);
console.log(buf2);


/* byteLength : 버퍼의 용량(바이트)을 반환함 */
var size1 = Buffer.byteLength(buf1);
console.log("size1 : ", size1);

/* length : 버퍼의 용량(바이트)을 반환함 */
console.log("bytes : ", buf1.length);


/* from : 지정된 값을 관리하는 기억공간이 만들어짐 */
var buf3 = Buffer.from('abcd');
var buf4 = Buffer.from('안녕하세요');
console.log(buf3);
console.log(buf4);


/* compare : 두 기억공간을 비교함 
			 같으면 0, 첫 번째 버퍼가 값이 크면 1, 작으면 -1 반환 */
var buf5 = Buffer.from('cccc');
var buf6 = Buffer.from('cccc');
var buf7 = Buffer.from('aaaa');
var buf8 = Buffer.from('dddd');

var v1 = Buffer.compare(buf5, buf6);
console.log("v1 : ", v1);	// v1 : 0

var v2 = Buffer.compare(buf5, buf7);
console.log("v2 : ", v2);	// v2 : 1

var v3 = Buffer.compare(buf5, buf8);
console.log("v3 :", v3);	// v3 : -1


/* concat : 배열 안에 있는 모든 버퍼를 하나로 합쳐 새로운 버퍼를 생성함 */
var array1 = [buf5, buf6, buf7, buf8];

var buf9 = Buffer.concat(array1);
console.log(buf9);


/* copy : 버퍼의 내용을 다른 버퍼에 복사함 */
var buf10 = Buffer.from('123456789');
var buf11 = Buffer.alloc(10);

// buf10 버퍼의 2번째 인덱스부터 5번째 인덱스 전까지의 데이터를  buf11 버퍼의 0번째 인덱스부터 시작해서 복사함
buf10.copy(buf11, 0, 2, 5);
console.log(buf11);


/* entries : 버퍼의 내용을 [인덱스, 값] 형태의 객체로 만들어 가지고 있는 배열을 반환함 */
var array2 = buf5.entries();
for(var entry of array2){
	console.log(entry);
}


/* equals : 두 버퍼의 내용이 같은지 비교함 */ 
var buf12 = Buffer.from('abcd');
var buf13 = Buffer.from('abcd');
var buf14 = Buffer.from('zzzz');

var v4 = buf12.equals(buf13);
console.log("v4 : ", v4);	//true

var v5 = buf12.equals(buf14);
console.log("v5 : ", v5);	//false


/* fill : 버퍼에 지정된 값을 채워줌 */ 
var buf15 = Buffer.from('aaaaa');
console.log(buf15);	//aaaaa

buf15.fill('c');
console.log(buf15);	//ccccc

buf15.fill('abc');
console.log(buf15);	//abcab


/* includes : 버퍼에 지정된 값이 있는지 확인 */ 
var buf16 = Buffer.from("Hello Node.js Node.js");
var v6 = buf16.includes("Node"); 
console.log("v6 : ", v6);	//true

var v7 = buf16.includes("JavaScript");
console.log("v7 : ", v7);	//false


/* indexOf : 버퍼에 지정된 값의 위치를 반환함 (값이 없을 경우 -1 반환)*/ 
var v8 = buf16.indexOf("Node");
console.log("v8 : ", v8); 	//6

var v9 = buf16.indexOf("JavaScript");
console.log("v9 : ", v9);	//-1


/* lastIndexOf : 버퍼에 지정된 값의 위치를 뒤에서부터 검사하여 반환함 (값이 없을 경우 -1 반환)*/ 
var v10 = buf16.lastIndexOf("Node");
console.log("v10 : ", v10);	//14


/* isBuffer : 지정된 객체가 버퍼 객체인지 확인 */
var v11 = Buffer.isBuffer(buf15);
console.log("v11 : ", v11);	//true

var obj1 = {
		a1 : 10
};
var v12 = Buffer.isBuffer(obj1);
console.log("v12 : ", v12);	//false


/* keys : 버퍼에 저장된 객체의 인덱스를 가져옴 */
var array3 = buf16.keys();
for(var i of array3){
	console.log(i);	//0~20
}


/* toString : 버퍼에 저장된 값을 문자열로 가져옴 */
var v13 = buf16.toString();
console.log("v13 : ", v13);	//Hello Node.js Node.js



