
var express = require("express");
var app = express();
var ejs = require("ejs");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);

var router = require("./router/ejs_controller")(app);

var server = app.listen(2000, function(){
	console.log("서버 가동");
})
