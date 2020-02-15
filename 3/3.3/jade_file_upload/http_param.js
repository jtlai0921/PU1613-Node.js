var _res,_req,
	url = require('url'),
	querystring = require('querystring');
/**
 * 起始化res和req參量
 */
exports.init = function(req, res){
	_res = res;
	_req = req;
}

/**
 * 取得GET參數方法
 */
exports.GET = function(key){
	var paramStr = url.parse(_req.url).query,
		param = querystring.parse(paramStr);
	return param[key] ? param[key]  : '';
}

/**
 * 取得POST參數方法
 */
exports.POST = function(key, callback){
	var postData = '';
	_req.addListener('data', function(postDataChunk) {
        postData += postDataChunk;
    });
    _req.addListener('end', function() {
        // 資料接收完畢，執行回調函數
        var param = querystring.parse(postData);
		console.log(param);
		console.log(param['image']);
		var value = param[key] ? param[key]  : '';
		callback(value);
    });
}