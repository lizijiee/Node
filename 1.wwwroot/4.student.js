var http = require('http');
var fs = require('fs');
var url = require('url');
var moment = require('moment');

var server = http.createServer();
var student = [
    { name: '小明', sex: '男', age: 10, time: '2019' },
    { name: '小明1', sex: '男', age: 10, time: '2019' },
    { name: '小明2', sex: '男', age: 10, time: '2019' },
    { name: '小明3', sex: '男', age: 10, time: '2019' },
    { name: '小明4', sex: '女', age: 22, time: '2020' },
]


server.on('request', function (req, res) {
    var urls = req.url;
    console.log(urls)
    if (urls === '/') {
        // 说明用户访问的是 localhost:8080 返回index.html
        fs.readFile('./6.index.html', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var html = '';
            student.forEach(function (item) {
                html += `<tr>
                       <td>${item.name}</td>
                       <td>${item.sex}</td>
                       <td>${item.age}</td>
                       <td>${item.time}</td>
                      </tr>`
            })
            var data = data.replace('@@', html)
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
            res.end(data)
        })
    } else if (urls == '/add') {
        // 添加页面
        fs.readFile('./7.add.html', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return
            }
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
            res.end(data)
        })
    }
    // else if (urls == '/doadd') {
    else if (urls.indexOf('/doadd') == 0) {
        if (req.method == 'POST') {


        } else {
            var params = url.parse(req.url, true).query//true 变成对象
            var newTime= moment().format('YYYY-MM-D h:mm:ss')
            var newStu = { name: params.name, sex: params.sex, age: params.age, time: newTime }
            student.push(newStu);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end(); // 必须需要res.end作为结束。
            // 用户使用get提交
        }
    }
    // res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
    // res.end('数据已经返回')
})

server.listen(8080, function () {
    console.log('服务器已经启动，端口号为8080')
})