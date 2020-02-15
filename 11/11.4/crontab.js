/*
 * 
 * crontab.js
 */
var TASK_ARR = [];

module.exports = {
	/**
	 *
	 * 定點工作
	 */
	time_task : function(){
		// time=12:12:00
		var time      = arguments[0]
		  , task      = arguments[1]
		  , splitArr  = time.split(':')
		  , hour      = splitArr[0]
		  , minute    = splitArr[1]
		  , sec       = splitArr[2] ? splitArr[2] : '00'
		  , taskObj   = {
			'hour'    : parseInt(hour),
			'minute'  : parseInt(minute),
			'sec'     : parseInt(sec),
			'task'    : task
		  };
		TASK_ARR[TASK_ARR.length] = taskObj;
	},
	
	/**
	 *
	 * 隔斷時間工作
	 */
	circle_task : function(){
		var sec      = arguments[0],
		    task     = arguments[1];
		if(!sec || !task){
			callback('');
		}
		// 若果是函數工作時，則執行函數
		if(typeof task == 'function'){
			setInterval(function(){
				var now= new Date();
				console.log('' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
				 task.call();
			}, sec);
		}
		
		// 若果是字元型態時，則執行當作shell執行
		if(typeof task == 'string'){
			setInterval(function(){
				var spawn = require('child_process').spawn;
				var shell = spawn(task);
				shell.stdout.setEncoding('utf8');
				shell.stdout.on('data', function (data) {
					console.log('stdout: ' + data);
				});
			}, sec);
		}
	}
}

// 定點工作
setInterval(function(){
	var now= new Date()
      , hour=now.getHours()
	  , minute=now.getMinutes()
	  , second=now.getSeconds();
		  
	for(var i=0; i<TASK_ARR.length; i++){
		var timeTask = TASK_ARR[i];
		if(hour == timeTask['hour'] && minute == timeTask['minute'] && second == timeTask['sec']){
			if(typeof timeTask['task'] == 'function'){
				timeTask['task'].call();
			} else if(typeof timeTask['task'] == 'string'){
				var spawn = require('child_process').spawn;
				var shell = spawn(timeTask['task']);
				shell.stdout.setEncoding('utf8');
				shell.stdout.on('data', function (data) {
					console.log('stdout: ' + data);
				});
			}
		}
	}
}, 1000);