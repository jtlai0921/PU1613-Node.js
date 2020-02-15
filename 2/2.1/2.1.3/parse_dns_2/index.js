/**
 * http dns fileSystem url是node.js原生模組
 * 主要是利用兩者做一個域名解析實例
 */
 /* 首先require 載入兩個模組 */
 var http = require('http'), 
	 url  = require('url') ;
/* 檢視官網API我們可以看到http模組提供建立http的方法，dns提供解析dns的方法 */
	/* 載入檔案模組 */
  var Router   = require('./router.js');

/* 建立http伺服器 */
http.createServer(function(req, res) {
	/* 寫http head 傳回html，因此Content-Type為html*/
	var pathname = url.parse(req.url).pathname;
	req.setEncoding("utf8");
	res.writeHead(200, { 'Content-Type': 'text/html' });
	Router.router(res, req, pathname);
}).listen(3000, "127.0.0.1");
/* 列印執行log */
console.log('Server running at http://127.0.0.1:3000/');

