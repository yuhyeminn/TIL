/**
 * http.js
 */

var http = require("http");
var url = require("url");	

// createServer : 웹 서버 개체를 만듦
var server = http.createServer(function(req, res){
	
//	res.write("Hello World");
	
//	클라이언트가 전달하는 파라미터는 url모듈을 이용하면 코드로 받아낼 수 있음
	var q = url.parse(req.url, true);
	
//  헤더 정보 셋팅
	res.writeHead(200, {"content-type" : "text/html"});
//	res.writeHead(200, {"content-type" : "audio/mp3"});
	
	console.log(req.url);
	res.write("<!DOCTYPE html>");
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'/>");
	res.write("</head>");
	res.write("<body>");
	
	switch(q.pathname){
	case "/" :
		res.write("<h1>root 입니다. </h1>");
		res.write("<a href = 'test1?data1=111'>test1</a><br/>")
		res.write("<a href = 'test2?data1=222'>test2</a><br/>")
		break;
	case "/test1":
		res.write("<h1>test1 입니다. </h1>");
		// 파라미터 값은 query라는 객체 안에 있음.
		res.write("<h1>data1 : " + q.query.data1 + " </h1><br/>");
		break;
	case "/test2":
		res.write("<h1>test2 입니다. </h1>");
		res.write("<h1>data1 : " + q.query.data1 + " </h1><br/>");
		break;
	}

	res.write("</body>");
	res.write("</html>");
	
	res.end();
});

// listen : 웹 서버를 동작시킴
server.listen(1234); // 포트번호 입력
console.log("서버 가동");

