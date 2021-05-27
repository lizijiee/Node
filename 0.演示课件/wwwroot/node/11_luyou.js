function server(server) {
    var fs = require('fs');
    var moment = require('moment');
    var student = [
        { name: '小明', sex: '男', age: 19, time: '2019' },
        { name: '小明1', sex: '男', age: 24, time: '2019' },
        { name: '小明2', sex: '男', age: 19, time: '2019' },
        { name: '小明3', sex: '男', age: 19, time: '2019' },
        { name: '小明4', sex: '女', age: 39, time: '2019' },

    ]
    server.on('request', function (req, res) {
        //console.log('正在监听用户请求');

        var urls = req.url;

        //console.log(urls)

        if (urls == '/') {
            //说明用户访问的是 localhost:8080
            fs.readFile('./index.html', 'utf-8', function (err, data) {
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

                var data = data.replace('@@', html);

                res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
                res.end(data)
            })

        }
        else if (urls == '/add') {
            //添加页面
            fs.readFile('./add.html', 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }

                res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
                res.end(data)


            })
        }
        else if (urls.indexOf('/doadd') == 0) {
            if (req.method == 'POST') {
                //用户使用 post提交

            } else {
                //用户使用GET提交

                var params = url.parse(req.url, true).query;
                console.log(params);

                var newtime = moment().format('YYYY-MM-D h:mm:ss');

                var newstu = { name: params.name, sex: params.sex, age: params.age, time: newtime }

                student.push(newstu);


                res.statusCode = 302;
                res.setHeader('Location', '/')
                res.end();//注意

            }

        }



        //res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        //res.end('数据已经返回')
    })

}


exports.server = server;