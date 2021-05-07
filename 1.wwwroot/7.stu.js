var http = require('http');

var server = http.createServer();

var luyou=require('./8.luyou.js');

luyou.server(server);

server.listen(8080, function () {
    console.log('服务器已经启动，端口号为8080')
})