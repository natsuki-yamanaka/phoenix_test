#!/usr/bin/env node
var d = function(msg){console.log(msg);};
var util = require('util');
var uin = util.inspect;

var phoenix = require('phoenix-js');
var uuid = require('node-uuid');
var sockets = {};

var maxNum = 100;
var nowSocketAddNum = 0;
var secForWait = 50;//milliseconds
var domain = '127.0.0.1';
var port = 4000;

main();

function main(){
	if(nowSocketAddNum < maxNum){
		addSocket(uuid.v4());
		setTimeout(function(){
			main();
		}, secForWait);
	}
}

function addSocket(uuid){
	var socket = new phoenix.Socket('ws://'+domain+':'+port+'/socket', {transport: require('websocket').w3cwebsocket});
	socket.connect();
	var channel = socket.channel('rooms:lobby');

	channel.join()
	  .receive('ok', resp => {
	    d(`> joining channel  ${channel.topic}`);
	  })
	  // .receive('new:msg', resp => {
	  //   console.log(`> new:msg  ${resp}`);
	  // })
	  .receive("error", reason => d(`Error joining channel: ${reason}`));

	channel.on("new:msg", msg => {
	      // d("> new:msg  -------- "+uin(msg));
	    })

	sockets[uuid] = {socket:socket, channel:channel};
	nowSocketAddNum++;
}


