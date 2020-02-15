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
	req.setEncoding("utf8");
	res.writeHead(200, { 'Content-Type': 'text/html' });
	router(res, req, pathname);
}).listen(3000, "127.0.0.1");
/* 列印執行log */
console.log('Server running at http://127.0.0.1:3000/');

function router(res, req, pathname){
	switch (pathname){
		case "/parse": 
			parseDns(res, req)
		break;
		default: 
			goIndex(res, req)
	}
}

function parseDns(res, req){
	var postData = "";
	req.addListener("data", function(postDataChunk) {
      postData += postDataChunk; 
    });
	req.addListener("end", function() {
		var retData = getDns(postData,function(domain,addresses){
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end("<html><head><meta http-equiv='content-type' content='text/html;charset=big5'></head><div style='text-align:center'>Domain:<span style='color:red'>" + domain + "</span> IP:<span style='color:red'>" + addresses.join(',') + "</span></div></html>");
		});
		return;
	});
}

function goIndex(res, req){
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	/* 傳回 */
	res.end(indexPage);
}

function getDns(postData,callback){
	var domain = querystring.parse(postData).search_dns;
	dns.resolve(domain, function(err, addresses){
		if(!addresses){
			addresses=['不存在域名']
		}
		callback(domain, addresses);
	});
}

