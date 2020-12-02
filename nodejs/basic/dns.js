/**
 * dns.js
 */

var dns = require("dns");

/* lookup : 지정된 도메인의 정보를 가져옴 */
dns.lookup("google.com", function(err, address, family){
	console.log("IP 주소 : ", address);
	console.log("IP 버전 : ", family);
});

var op1 = {
		family : 4
};
dns.lookup("google.com", op1, function(err, address, family){
	console.log("IP 주소 v4 : ", address);
});

var op2 = {
		family : 6
};
dns.lookup("google.com", op2, function(err, address, family){
	console.log("IP 주소 v6", address);
});
