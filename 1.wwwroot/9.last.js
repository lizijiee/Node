var http = require('http');
var fs = require('fs')
var server = http.createServer();

server.on('request', function (req, res) {
    res.end('Hello');
    var urls = req.url; //获取用户传入url
    if (urls == '/') {
        fs.readFile('9.index.html', function (err, data) {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
            res.end(data);
        })
    }
})
server.listen(8080, function () {
    console.log('服务器已经成功启动')
})