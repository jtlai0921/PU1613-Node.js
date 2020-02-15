/* index.js */
var res, req,
	fs = require('fs'),
	url   = require('url'),
	querystring = require('querystring'),
	httpParam = require('./http_param');
exports.init = function(response, request){
	res = response;
	req = request;
	httpParam.init(req, res);
}

exports.index = function(){
	/* 取得目前image的路徑 */
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(indexPage);
}

exports.calculate = function(){
	httpParam.POST('', function(param){
		var type      = param['type'] ? parseInt(param['type']) : 0
		  , preValue  = param['pre'] ? parseFloat(param['pre']) : 0
		  , nextValue = param['next'] ? parseFloat(param['next']) : 0
		  , ret       = 0;
		switch(type){
			case 1 : ret = preValue + nextValue;
			break;
			case 2 : ret = preValue - nextValue;
			break;
			case 3 : ret = preValue * nextValue;
			break;
			case 4 : ret = preValue / nextValue;
			break;
		}
		
		ret = '' + ret;
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(ret);
	});
	return;
}





