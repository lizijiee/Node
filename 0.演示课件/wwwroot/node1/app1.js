
var express = require('express');

var fs = require('fs');

var app = express();


//配置模版引擎
app.engine('html', require('express-art-template'));

var data = {
    name: '小明',
    sex: '男',
    score: [
        { id: 10, title: '语文',sCore: 80 },
        { id: 2, title: '语文1',sCore: 90 },
        { id: 3, title: '语文2',sCore: 70 },
    ]
}


app.get('/', function (req, res) {

    //fs.readFile('./index.html', function (err, data) {
    //    if (err) {
    //        console.log(err)
    //    }
    //    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    //    res.end(data)
    //})

    res.render('index.html',data)

})


//加载静态资源
app.use('/public', express.static('public'));


app.listen(8080, function () {
    console.log('服务器已经启动')
})



