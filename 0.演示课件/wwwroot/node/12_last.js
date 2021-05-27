
var http = require('http');

var fs = require('fs');

var server = http.createServer();

server.on('request', function (req, res) {
    //res.end('Hello')

    var urls = req.url;

    if (urls == '/') {
        fs.readFile('./index1.html', function (err, data) {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
            res.end(data);
        })
    }

    //else if (urls == '/images/a1.png') {
    //    fs.readFile('./images/a1.png', function (err, data) {
    //        if (err) {
    //            console.log(err)
    //        }
    //        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    //        res.end(data);
    //    })
    //} else if (urls == '/js/test.js') {
    //    fs.readFile('./js/test.js', function (err, data) {
    //        if (err) {
    //            console.log(err)
    //        }
    //        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    //        res.end(data);
    //    })
    //}

    else {
        fs.readFile('.' + req.url, function (err,data) {
            if (err) {
                console.log(err)
            }
           
            res.end(data);
        })

    }



})

server.listen(8080, function () {
    console.log('服务器启动成功')
})