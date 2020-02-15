var XML_TMP_DATA = {};
var fs = require('fs');

module.exports = {
	/**
	 *
	 * 解析xml模組
	 */
	parse : function(xmlPath, pathname, callback){
		var retInfo = {};
		// 讀取快取資料
		var cacheData = getCache(xmlPath, pathname);
		if(cacheData){
			retInfo['code'] = 0;
			retInfo['data'] = cacheData;
			callback(retInfo);
			return;
		}
		
		var xml2js  = require('xml2js');
		var parseString = xml2js.parseString;
		fs.exists(xmlPath, function (existBool) {
			if(existBool){
				var xmlInfo = fs.readFileSync(xmlPath);
				parseString(xmlInfo, function (err, result) {
					if(err){
						retInfo['code'] = -1;
					} else {
						retInfo['code'] = 0
						retInfo['data'] = result;
						cache(xmlPath, pathname, result);
					}
					callback(retInfo);
					return;
				});
			} else {
				retInfo['code'] = -2;
				retInfo['data'] = {};
				callback(retInfo);
			}
		});
	}
}
/* 加入快取訊息 */
function cache(filePath, fileName, data){
	var stat = fs.statSync(filePath);
	var timestamp = Date.parse(stat['mtime']);
	if(data){
		XML_TMP_DATA[fileName+timestamp] = data;
	}
}
/* 取得快取資料 */
function getCache(filePath, fileName){
	var stat = fs.statSync(filePath);
	var timestamp = Date.parse(stat['mtime']);
	if(XML_TMP_DATA[fileName+timestamp]){
		return XML_TMP_DATA[fileName+timestamp];
	}
	return null;
}