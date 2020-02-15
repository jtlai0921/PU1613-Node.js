 /* 首先require 載入兩個模組 */
 var http = require('http'), 
	 fs    = require('fs'),
	 url   = require('url'),
	 staticModule = require('./static_module'),
	 BASE_DIR = __dirname;
global.httpParam = require('./http_param');
http.createServer(function(req, res) {
	/* 取得目前index.html的路徑 */
	var pathname = url.parse(req.url).pathname;
	httpParam.init(req, res);
	if (pathname == '/favicon.ico') {
		return;
	}
	var pathArr = pathname.split('/');
	// 出現第一個空字元
	pathArr.shift();
	
	var model = pathArr.shift()
	  , controller = pathArr.shift()
	  , classObj = '';
	if(!model || !controller){
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('can not find source');
	}
	
	try {
		classObj = require('./' + model);
	}
	catch (err) {
		console.log('chdir: ' + err);
	}
	if(classObj){
		classObj.init(res, req);
		try{
			classObj[controller].call();
		} catch(err){
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('can not find source');
		}
		
	} else {
		staticModule.getStaticFile(pathname, res, req);
	}
}).listen(1337);
console.log('Server running at http://localhost:1337/');