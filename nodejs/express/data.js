
var express = require("express");
var app = express();
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
app.use(cookieParser());
app.use(session({
	secret : "abcdefg",
	resave : false,
	saveUninitialized : true
}))

var router = require("./router/data_controller")(app);

//listen : 서버를 가동시킴
var server = app.listen(2000, function(){
	console.log("서버 가동");
});

