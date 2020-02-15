/**
 * @type class BaseModel
 * @author danhuang
 * @time 2012-12-22
 * @desc desc base_model.js
 */
 var Util = require('./util')
   , mysql = require('mysql')
   , dbClient;
  
 module.exports = function(){
	__constructor();
	/**
	 *
	 * 根據主鍵id值查詢資料庫的一條記錄
	 * @param tableName string 
	 * @param idJson id 
	 * @param callback function
	 * @return null
	 */
	this.findOneById = function(tableName, idJson, callback){
		dbClient.query('SELECT * FROM ' + tableName + ' where ?', idJson,
            function(error, results) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    dbClient.end();
                    callback(false);
                } else {
					if(results){ //若果查詢到資料則傳回一條資料即可
						callback(results.pop());
					} else{ //查詢資料為空則傳回空資料
						callback(results);
					}
				}
        });
	};
	
	/**
	 *
	 * @desc 向資料庫插入資料
	 * @param tableName string 
	 * @param rowInfo json 
	 * @param callback function
	 * @return null
	 */
	this.insert = function(tableName, rowInfo, callback){
		dbClient.query('INSERT INTO ' + tableName + ' SET ?', rowInfo, function(err, result) {
			if (err) throw err;
			callback(result.insertId);
		});
	};
	
	/**
	 *
	 * @desc 修改資料庫的一條資料
	 * @param tableName string 
	 * @param idJson json 
	 * @param callback function
	 * @return null
	 */
	this.modify = function(tableName, idJson, rowInfo, callback){
		dbClient.query('update ' + tableName + ' SET ? where ?', [rowInfo, idJson], function(err, result) {
			if(err) {
                console.log("ClientReady Error: " + err.message);
				callback(false);
			} else {
				callback(result);
			}
		});
	};
	
	/**
	 *
	 * @desc 移除資料庫的一條資料
	 * @param tableName string 
	 * @param idJson json 
	 * @param rowInfo json 
	 * @param callback function
	 * @return null
	 */
	this.remove = function(tableName, idJson, callback){
		dbClient.query('delete from ' + tableName + ' where ?', idJson,
            function(error, results) {
                if(error) {
                    console.log("ClientReady Error: " + error.message);
                    dbClient.end();
                    callback(false);
                } else {
					callback(true);
				}
        });
	};
	
	/**
	 *
	 * @desc 條件查詢資料
	 * @param tableName string 
	 * @param whereJson json desc(and和or區別，其中的條件為key值、連線符大於小於還是等於、value值) 
	 * @param orderByJson json desc({'key' : 'time', 'type':'desc'}) 
	 * @param limitArr array desc（第一個元素是傳回偏移量，第二個是傳回數量，空傳回全部）
	 * @param fieldsArr array desc（傳回哪些字段）
	 * @param callback function
	 * @return null
	 */
	this.find = function(tableName, whereJson, orderByJson, limitArr, fieldsArr, callback){
		var andWhere   = whereJson['and']
		  , orWhere    = whereJson['or']
		  , andArr = []
		  , orArr  = [];
		 /* 將陣列轉為where and條件array */
		for(var i=0; i<andWhere.length; i++){
			andArr.push(andWhere[i]['key'] + andWhere[i]['opts'] + andWhere[i]['value']);
		}
		 /* 將陣列轉為where or條件array */
		for(var i=0; i<orWhere.length; i++){
			orArr.push(orWhere[i]['key'] + orWhere[i]['opts'] +orWhere[i]['value']);
		}
		/* 判斷條件是否存在，若果存在則轉換對應的加入敘述 */
		var filedsStr = fieldsArr.length>0 ? fieldsArr.join(',') : '*'
		  , andStr    = andArr.length>0    ? andArr.join(' and ') : ''
		  , orStr     = orArr.length>0     ? ' or '+orArr.join(' or ') : ''
		  , limitStr  = limitArr.length>0  ? ' limit ' + limitArr.join(',') : ''
		  , orderStr  = orderByJson ? ' order by ' + orderByJson['key'] + ' ' + orderByJson['type'] : '';
		/* 執行mysql敘述 */
		dbClient.query('SELECT ' + filedsStr + ' FROM ' + tableName + ' where ' + andStr + orStr + orderStr + limitStr,
            function(error, results) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    dbClient.end();
                    callback(false);
                } else {
					callback(results);
				}
        });
	};
	
	/**
	 *
	 * 資料庫連線建構函數
	 */
	function __constructor(){
		var dbConfig = Util.get('config.json', 'db');
		/* 取得mysql組態訊息 */
		client = {};
		client.host = dbConfig['host'];
		client.port = dbConfig['port'];
		client.user = dbConfig['user'];
		client.password = dbConfig['password'];
		dbClient = mysql.createConnection(client);
		dbClient.connect();
		/* 執行mysql指令，連線mysql伺服器的一個資料庫 */
		dbClient.query('USE ' + dbConfig['dbName'], function(error, results) {
			if(error) {
				console.log('ClientConnectionReady Error: ' + error.message);
				dbClient.end();
			}
			console.log('connection local mysql success');
		});
	}
 }