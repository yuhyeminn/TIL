// express : express 모듈에서 제공하는 기능을 사용할 수 있는 객체를 반환
var express = require("express");
var app = express();

//get : get방식으로 요청이 발생했을 때 호출될 함수 등록
//post : post방식으로 요청이 발생했을 때 호출될 함수 등록
app.get("/", function(req, res){
	res.send("ROOT");
});

app.get("/test", function(req, res){
	res.send("TEST");
})

// listen : 서버를 가동시킴
var server = app.listen(2000, function(){
	console.log("서버 가동");
});

