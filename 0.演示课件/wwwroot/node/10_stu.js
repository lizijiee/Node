
//创建服务器

var http = require('http');

var url = require('url');

var server = http.createServer();

var luyou = require('./11_luyou') //引入模块

luyou.server(server);

server.listen(8080, function () {
    console.log('服务器已经启动 访问localhost:8080')
})
