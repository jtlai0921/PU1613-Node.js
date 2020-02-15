 /* 首先require 載入兩個模組 */
 var http = require('http'), 
	 fs    = require('fs'),
	 url   = require('url');
http.createServer(function(req, res) {
	/* 取得目前index.html的路徑 */
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(indexPage);
}).listen(1337);
console.log('Server running at http://localhost:1337/');