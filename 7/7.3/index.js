var BaseMongodb = require('./base_mongodb')  , baseMongodb = new BaseMongodb()  , rowInfo = {}  , rowInfoNextOne = {}  , rowInfoNextTwo = {}  , rowInfoNextThree = {}  , tableName = 'node_book';rowInfo.book_name = 'nodejs book';rowInfo.author = 'danhuang';/*資料插入驗證 *//*rowInfo.book_name = 'nodejs book1';baseMongodb.insert(tableName, rowInfo, function(ret){	console.log(ret);});rowInfoNextOne.book_name = 'nodejs book2';rowInfoNextOne.author = 'danhuang';baseMongodb.insert(tableName, rowInfoNextOne, function(ret){	console.log(ret);});rowInfoNextTwo.book_name = 'nodejs book3';rowInfoNextTwo.author = 'danhuang';baseMongodb.insert(tableName, rowInfoNextTwo, function(ret){	console.log(ret);});rowInfoNextThree.book_name = 'nodejs book34';rowInfoNextThree.author = 'danhuang';baseMongodb.insert(tableName, rowInfoNextThree, function(ret){	console.log(ret);});*//* findOneById驗證 *//*var id ='50db1e69d923dbfe06000001';baseMongodb.findOneById(tableName, id, function(ret){	console.log(ret);});*//* modify驗證 *//*var newInfo = {};newInfo.book_name = 'nodejs book-by danhuang';newInfo.author = 'Jimi';var id = '50db1e69d923dbfe06000001';baseMongodb.modify(tableName, id, newInfo, function(ret){	console.log(ret);});*//* remove驗證 *//*var id = '50db1e69d923dbfe06000001';baseMongodb.remove(tableName, id, function(ret){	console.log(ret);});*//* find驗證 *//*var whereJson = {'author':'danhuang'};var fieldsJson = {'book_name':1, 'author':1};var orderByJson = {'book_name':1};var limitJson = {'num':10};baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, function(ret){	console.log(ret);});*/