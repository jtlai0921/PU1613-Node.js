/**
 * http dns fileSystem url�Onode.js��ͼҲ�
 * �D�n�O�Q�Ψ�̰��@�Ӱ�W�ѪR���
 */
 /* ����require ���J��ӼҲ� */
 var http = require('http'), 
	 dns   = require('dns'),
	 fs    = require('fs'),
	 url   = require('url'),
	 querystring = require("querystring");
/* �˵��x��API�ڭ̥i�H�ݨ�http�Ҳմ��ѫإ�http����k�Adns���ѸѪRdns����k */

/* �إ�http���A�� */
http.createServer(function(req, res) {
	/* �ghttp head �Ǧ^html�A�]��Content-Type��html*/
	var pathname = url.parse(req.url).pathname;
	req.setEncoding("utf8");
	res.writeHead(200, { 'Content-Type': 'text/html' });
	router(res, req, pathname);
}).listen(3000, "127.0.0.1");
/* �C�L����log */
console.log('Server running at http://127.0.0.1:3000/');

function router(res, req, pathname){
	switch (pathname){
		case "/parse": 
			parseDns(res, req)
		break;
		default: 
			goIndex(res, req)
	}
}

function parseDns(res, req){
	var postData = "";
	req.addListener("data", function(postDataChunk) {
      postData += postDataChunk; 
    });
	req.addListener("end", function() {
		var retData = getDns(postData,function(domain,addresses){
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end("<html><head><meta http-equiv='content-type' content='text/html;charset=big5'></head><div style='text-align:center'>Domain:<span style='color:red'>" + domain + "</span> IP:<span style='color:red'>" + addresses.join(',') + "</span></div></html>");
		});
		return;
	});
}

function goIndex(res, req){
	var readPath = __dirname + '/' +url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);
	/* �Ǧ^ */
	res.end(indexPage);
}

function getDns(postData,callback){
	var domain = querystring.parse(postData).search_dns;
	dns.resolve(domain, function(err, addresses){
		if(!addresses){
			addresses=['���s�b��W']
		}
		callback(domain, addresses);
	});
}

