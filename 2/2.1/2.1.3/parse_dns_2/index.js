/**
 * http dns fileSystem url�Onode.js��ͼҲ�
 * �D�n�O�Q�Ψ�̰��@�Ӱ�W�ѪR���
 */
 /* ����require ���J��ӼҲ� */
 var http = require('http'), 
	 url  = require('url') ;
/* �˵��x��API�ڭ̥i�H�ݨ�http�Ҳմ��ѫإ�http����k�Adns���ѸѪRdns����k */
	/* ���J�ɮ׼Ҳ� */
  var Router   = require('./router.js');

/* �إ�http���A�� */
http.createServer(function(req, res) {
	/* �ghttp head �Ǧ^html�A�]��Content-Type��html*/
	var pathname = url.parse(req.url).pathname;
	req.setEncoding("utf8");
	res.writeHead(200, { 'Content-Type': 'text/html' });
	Router.router(res, req, pathname);
}).listen(3000, "127.0.0.1");
/* �C�L����log */
console.log('Server running at http://127.0.0.1:3000/');

