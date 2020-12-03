
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app){
	app.get("/", function(req,res){
		res.render("data_index.ejs");
	});
	
	app.get("/parameter", function(req, res){
		var render_data = {
				data1 : req.query.data1,
				data2 : req.query.data2
		}
		res.render("parameter.ejs", render_data);
	});
	
	app.post("/parameter", urlencodedParser, function(req, res){
		var render_data = {
				data1 : req.body.data1,
				data2 : req.body.data2
		}
		res.render("parameter.ejs", render_data);
	})
	
	app.get("/save_cookie", function(req, res){
		var op = {
				maxAge : 365 * 24 * 60 * 60
		};
		res.cookie("cookie1", "aaaaa", op);	//1년간 유지
		res.render("save_cookie.ejs");
	});
	
	app.get("/load_cookie", function(req, res){
		var render_data = {
				cookie1 : req.cookies.cookie1
		};
		res.render("load_cookie.ejs", render_data);
	});
	
	app.get("/save_session", function(req, res){
		req.session.data1 = 100;
		req.session.data2 = "안녕하세요";
		
		res.render("save_session.ejs");
	});
	
	app.get("/load_session", function(req, res){
		var render_data = {
				data1 : req.session.data1,
				data2 : req.session.data2
		};
		res.render("load_session.ejs", render_data);
	});
};