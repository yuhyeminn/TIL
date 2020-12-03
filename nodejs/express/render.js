
var express = require("express");
var ejs = require("ejs");

var app = express();

//렌더링을 위한 세팅
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

//html파일 내에서의 정적 파일들의 위치를 public폴더내에서 찾음.
app.use(express.static("public"));

var controller = require("./router/render_controller")(app);

var server = app.listen(2000, function(){
	console.log("서버가 가동되었습니다.");
});