var fs = require("fs");
// ���B���oindex.conf�ɮסA�æb�^�ը�Ƥ��N���浲�Gdata�Ǧ^��getFileData��Ƥ�
fs.readFile('index.conf', function (err, data) {
  getFileData(data);
});

// ���odata��ƫ�A����setTimeout�N�Ǧ^�Ȥ@���ǻ���returnData��
function getFileData(data){
	setTimeout(returnData(data), 1000);
}

// ���odata��ơA�æC�L
function returnData(data){
	console.log(data);
}