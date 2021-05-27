var http = require('http');

var server = http.createServer();

//监听用户请求
server.on('request', function (req, res) {
    console.log('用户已经发送请求')
    //console.log(req.headers);
    //console.log(req.url);

    res.setHeader('Conent-Type', 'text/html;charset=utf-8');

    res.write('1111')
    res.write('2222')
    res.end('Hello World')

})

server.listen(8080, function () {
    console.log('服务器已启动请访问 localhost:8080')

})


