/**
 * clustor.js
 */

var cluster = require("cluster");

// Round Robin 방식으로 스케쥴링
cluster.schedualingPolicy = cluster.SCHED_RR;

// master worker - 병렬처리
// worker - 시분할처리
if(cluster.isMaster == true){
	
	cluster.fork(); //하나의 worker 발생
	cluster.fork();
	cluster.fork();
	
	cluster.on('online', function(worker){
		for(var i = 0; i < 10 ; i++){
			console.log(worker.process.pid, "동작");
		}
	});
}













