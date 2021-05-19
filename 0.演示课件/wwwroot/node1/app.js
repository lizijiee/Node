
var express = require('express');

var fs = require('fs');

//http  http.createServer()

var app = express();

app.get('/', function (req,res) {
    
    //res.end('响应用户请求');
    //res.render()
    //res.send('响应用户请求')

    fs.readFile('./index.html', function (err,data) {
        if (err) {
            console.log(err)
        }
        res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        res.end(data)
    })   

})


//app.get('/test', function (req,res) {
//    res.send('get请求')
//})

//app.post('/test', function (req, res) {
//    res.send('post请求')
//})

//app.all('/test', function (req, res) {
//   res.send('自动匹配请求方式')
//})

app.use('/test', function (req,res) {
    res.send('app.use自动匹配')
})

app.use('/test1/:name/:sex', function (req, res) {
    console.log(req.params);
    res.send(req.params.name)
})

//加载静态资源
app.use('/public', express.static('public'));


app.listen(8080, function () {
    console.log('服务器已经启动')
})



