var fs = require("fs");
// 異步取得index.conf檔案，並在回調函數中將執行結果data傳回到getFileData函數中
fs.readFile('index.conf', function (err, data) {
  getFileData(data);
});

// 取得data資料後，執行setTimeout將傳回值一秒後傳遞到returnData中
function getFileData(data){
	setTimeout(returnData(data), 1000);
}

// 取得data資料，並列印
function returnData(data){
	console.log(data);
}