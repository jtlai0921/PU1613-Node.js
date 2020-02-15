 /* 首先require 載入兩個模組 */
 var http        = require('http'), 
	 fs          = require('fs'),
	 url   	     = require('url'),
	 querystring = require('querystring'),
	 httpParam   = require('./http_param');
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	httpParam.init(req, res);
	switch(pathname){
		case '/add' : resAdd(res, req);
		break;
		default       : resDefault(res);
		break;
	}
}).listen(1337);

function resDefault(res){
	/* 取得目前index.html的路徑 */
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(indexPage);
}

function resAdd(res, req){
    // 設定接收資料解碼格式為 UTF-8
    req.setEncoding('utf8');
	httpParam.POST('name', function(value){
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(value);
	});
}