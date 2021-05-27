var express = require('express');

var fs = require("fs");

var app = express();

// 配置模板引擎
app.engine('html', require('express-art-template'));

var data = {
    name: '小明',
    sex: '男',
    score: [
        { id: 1, title: '语文', sCore: 100 },
        { id: 2, title: '数学', sCore: 99 },
        { id: 3, title: '音乐', sCore: 100 },
    ]
}

app.get("/", function (req, res) {
    res.render('index.html', data)

    //   fs.readFile("./index.html", function (err, data) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     res.writeHead(200, { "content-type": "text/html;charest=utf-8" });
    //     res.end(data);
    //   });
});
app.use("/test", function (req, res) {
    res.send("响应用户请求"); // 自动识别，正常显示文字
});
app.use("/test1/:name/:sex", function (req, res) {
    res.send(req.params); // 自动识别，正常显示文字
});

app.use('/public', express.static('public'));

app.listen(8080, function () {
    console.log("服务器已经启动");
});
