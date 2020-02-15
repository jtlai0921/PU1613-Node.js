/* index.js */
var res, req,
	fs = require('fs'),
	url   = require('url');
exports.init = function(response, request){
	res = response;
	req = request;
}

exports.index = function(){
	/* 取得目前image的路徑 */
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(indexPage);
}