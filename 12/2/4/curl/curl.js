/**
 *
 * @author danhuang 2013-03-08
 * @class for http get or post
 *
 */
var request = require ('request' );
var querystring = require('querystring');

module.exports = {
     get : function(){
			// 取得get方法的參數 url、get和callback
			var url = arguments[0]
			  , get = arguments[1]
			  , callback = arguments[2];
			if(!callback && typeof get == 'function'){
				get = {};
				callback = arguments[1];
			}
			
			if(!url){
				callback('');
			}
			
            var params  = {};
			// 為url副檔名加入?或是&符號
            if(get){
                 if(url.indexOf( '?') > -1){
                      url = url + '&';
                } else {
                      url = url + '?';
                }
            }
            url = url + querystring.stringify(get);

            params[ 'url']  = url;
            params[ 'json'] = true;     
			// 呼叫request請求資源
            request.get(params, function(error, response, result){
                 if(error){
                      console.log(error);
                      callback(result);
                } else {
                      callback(result);
                }
            });
     },
     
     post : function(){
			// 取得get方法的參數 url、get和callback
			var url = arguments[0]
			  , post = arguments[1]
			  , callback = arguments[2];
			if(!callback && typeof post == 'function'){
				post = {};
				callback = arguments[1];
			}
	 
			if(!url){
				callback('');
			}
			
            var params  = {};
           
            params[ 'url']  = url;
            params[ 'json'] = true;
            params[ 'form'] = post;
           
            request.post(params, function(error, response, result){
                 if(error){
                      callback(result);
                } else {
                      callback(result);
                }
            });
     }
}
