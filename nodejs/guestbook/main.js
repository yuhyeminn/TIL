
var express = require("express");
var app = express();
var ejs = require("ejs");
var session = require("express-session");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
app.use(session({
	secret : "abcdefg",
	resave : false,
	saveUninitialized : false
}));

var router = require("./router/controller")(app);

var server = app.listen(2000, function(){
	console.log("서버 가동");
});