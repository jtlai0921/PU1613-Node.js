/**
 *
 * @author danhuang 2013-03-07
 *
 */
var FAVICON = '/favicon.ico';

exports.router = function(res, req){
	var logInfo = {};
	// url解碼，避免url路徑出現中文字元
	var pathname = decodeURI(lib.url.parse(req.url).pathname);
	// 起始化http參數取得模組
	lib.httpParam.init(req, res);
	// 起始化session管理模組
	global.sessionLib = lib.session.start(res, req);
	// 取得http請求路徑，使用斜槓取得請求的controller類別名以及action方法
	var pathArr = pathname.split('/');
	// 出現第一個空字元
	pathArr.shift();
	var model = pathArr.shift()
	  , controller = pathArr.shift()
	  , Class = '';
	  
	//  加入日志訊息
	logInfo['pathname'] = pathname;
	logInfo['model'] = model;
	logInfo['controller'] = controller;
	
	// 過濾favicon請求
	if(pathname == FAVICON){
		return;
	}else if(pathname == '/'){
		res.render(VIEW + 'index.jade');
		return;
	}
	if(!controller || !model){
		returnDefault(res, 'can not find source');
		return;
	}
	// 嘗試require一個controller類別名，若果失敗則認為是一個靜態資源檔案請求
	try {
		Class = require(CON + model);
	}
	catch (err) {
		console.log(err);
		lib.staticModule.getStaticFile(pathname, res, req, BASE_DIR);
		return;
	}
	if(Class){
		var object = new Class(res, req);
		try{
			object[controller].call();
		} catch(err){
			console.log(err);
			returnDefault(res, 'no this action');
		}
	} else {
		returnDefault(res, 'can not find source');
	}
}

/**
 *
 * 預設404失敗頁面
 */
function returnDefault(res, string){
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end(string);
}






