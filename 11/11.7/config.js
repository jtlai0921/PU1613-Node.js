var fs = require('fs');

global.CONFIG = {};
/**
 *
 * 讀取組態檔訊息
 * @param filename 組態檔名
 * @param type 組態檔型態
 * @param key 取得傳回的主鍵值
 */
function get(){
	var fileName = arguments[0],
		type     = arguments[1],
		key      = arguments[2] ? arguments[2] : ''; 
	var filePath = 'conf/' + fileName;
	// 從cache中取得資料
	var cacheData = getCache(filePath, fileName, key);
	if(cacheData){
		return cacheData;
	}
	// 讀取組態檔訊息，並做快取
	switch(type){
		case 'conf' :
			return getConf(fileName, filePath, key);
		break;
		case 'json' :
			return getJson(fileName, filePath, key);
		break;
	}
}

/**
 *
 * 取得conf型態的組態檔內容
 * @param fileName 組態檔名
 * @param filePath 組態檔路徑
 * @param key 取得傳回的主鍵值
 */
function getConf(fileName, filePath, key){
	try{
        var r = [],
        q = require("querystring"),
        f = fs.readFileSync(filePath, "utf8"),
		v = q.parse(f, '[', ']'),
        t;
    }catch(e){
        console.log(e);
		return '';
    }
	 for (var i in v) {
        if (i != '' && v[i] != '') {
            r = {};
            t = q.parse(i, v[i], '=');
            for (var j in t) {
                if (j != '' && t[j] != '')
                    r[j] = t[j];
            }
        }
    }
	cache(filePath, fileName, r);
    return r[key] ? r[key] : r;
}

/**
 *
 * 取得json組態檔型態的內容
 * @param fileName 組態檔名
 * @param filePath 組態檔路徑
 * @param key 取得傳回的主鍵值
 */
function getJson(fileName, filePath, key){
    try{
        var str = fs.readFileSync(filePath, 'utf8');
		configJson = JSON.parse(str);
    }catch(e){
        console.log(e);
		return '';
    }
    cache(filePath, fileName, configJson)
   return configJson[key] ? configJson[key] : configJson;
}

/**
 *
 * 取得快取檔案中的資料
 * @param fileName 組態檔名
 * @param filePath 組態檔路徑
 * @param key 取得傳回的主鍵值
 */
function getCache(filePath, fileName, key){
	var stat = fs.statSync(filePath);
	var timestamp = Date.parse(stat['mtime']);
	if(CONFIG[fileName+timestamp]){
		return CONFIG[fileName+timestamp][key] ? CONFIG[fileName+timestamp][key] : CONFIG[fileName+timestamp];
	}
	return null;
}

/**
 *
 * 快取組態檔內容
 * @param fileName 組態檔名
 * @param filePath 組態檔路徑
 * @param key 取得傳回的主鍵值
 */ 
function cache(filePath, fileName, data){
	var stat = fs.statSync(filePath);
	var timestamp = Date.parse(stat['mtime']);
	if(data){
		CONFIG[fileName+timestamp] = data;
	}
}

// 曝露外部呼叫接口get
exports.get = get;
