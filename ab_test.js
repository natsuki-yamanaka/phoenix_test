#!/usr/bin/env node
var d = function(msg){console.log(msg);};
var util = require('util');
var uin = util.inspect;

var spawn = require('child_process').spawn;
// const { spawn } = require('child_process');
var uuid = require('node-uuid');

var processes = {};
var processNum = 50;
var nowProcessAddNum = 0;
var secForWait = 6000;//milliseconds

process.on('uncaughtException', function(err) {
    d("uncaughtException raised. -- err:"+err);
});

main();

function main() {
	d("ab_test ----------- start. main nowProcessAddNum:"+nowProcessAddNum);
	if(nowProcessAddNum < processNum){
		addProcess(uuid.v4());
		setTimeout(function(){
			main();
		}, secForWait);
	}

	// d("ab_test ----------- end.");
}

function addProcess(uuid) {
	var ps = spawn("node", ['app']);
	ps.stdout.setEncoding('utf-8');
	ps.stdout.on('data', function (data) {
		d("ab_test child -- data:"+data+" uuid:"+uuid);
	});
	ps.stderr.setEncoding('utf-8');
	ps.stderr.on('data', function (data) {
		d("ab_test child err -- data:"+data+" uuid:"+uuid);
	});
	processes[uuid] = ps;
	nowProcessAddNum++;
}
