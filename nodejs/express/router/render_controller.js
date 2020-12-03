
module.exports = function(app){
	app.get("/", function(req,res){
		/*
		var html = "<!DOCTYPE html>"
				 + "<html>"
				 + "<head>"
				 + "<meta charset='utf-8'/>"
				 + "</head>"
				 + "<body>"
				 + "<h1>ROOT</h1>"
				 + "</body>"
				 + "</html>";
		res.send(html);
		*/
		//index.html 파일 렌더링
		res.render("index.html");
	});
	
	app.get("/test", function(req,res){
		res.render("test.html");
	});
};