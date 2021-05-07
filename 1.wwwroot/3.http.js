var http = require('http');
var server = http.createServer();
server.on('request', function (req, res) {
    // console.log(req.headers);
    // console.log(req.url);
    // console.log(req.body)
    res.setHeader('Conten-Type', 'text/heml;charset=utf-8');
    res.write('11111');
    res.write('222222')
    res.end('Hello World')
});

server.listen(8080, function () {
    console.log('服务器已经启动，端口号为8080')
})
