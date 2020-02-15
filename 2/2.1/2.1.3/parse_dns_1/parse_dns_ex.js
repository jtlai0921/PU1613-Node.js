/**
 * http dns fileSystem url是node.js原生模組
 * 主要是利用兩者做一個域名解析實例
 */
 /* 首先require 載入兩個模組 */
 var http = require('http'), 
	 dns   = require('dns'),
	 fs    = require('fs'),
	 url   = require('url'),
	 querystring = require("querystring");
/* 檢視官網API我們可以看到http模組提供建立http的方法，dns提供解析dns的方法 */

/* 建立http伺服器 */
http.createServer(function(req, res) {
	/* 寫http head 傳回html，因此Content-Type為html*/
	var pathname = url.parse(req.url).pathname;
	var postData = "";
	req.setEncoding("utf8");
	res.writeHead(200, { 'Content-Type': 'text/html' });
	/* 取得目前index.html的路徑 */
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	/* 傳回 */
	res.end(indexPage);
}).listen(3000, "127.0.0.1");
/* 列印執行log */
console.log('Server running at http://127.0.0.1:3000/');

function router(key, postData, callback){
	var domain = querystring.parse(postData).search_dns;
	if(key == "/parse"){
		getDns(domain,function(address){if(!address){address=['不存在域名']};callback(address,domain)});
	}
}

function getDns(domain,callback){
	dns.resolve(domain, function(err, addresses){
		callback(addresses);
	});
}

