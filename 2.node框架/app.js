var express = require('express');
var fs = require("fs");
// http http.createServer()
var app = express();
app.get("/", function (req, res) {
  // res.end('响应用户请求') // 页面乱码
  fs.readFile("./index.html", function (err, data) {
    if (err) {
      console.log(err);
    }
    res.writeHead(200, { "content-type": "text/html;charest=utf-8" });
    res.end(data);
  });
  //   res.send("响应用户请求"); // 自动识别，正常显示文字
});
app.use("/test", function (req, res) {
  // res.end('响应用户请求') // 页面乱码
  res.send("响应用户请求"); // 自动识别，正常显示文字
});
app.use("/test1/:name/:sex", function (req, res) {
  console.log(req.params); // { name: '小明', sex: '男' }
  // res.end('响应用户请求') // 页面乱码
  res.send(req.params); // 自动识别，正常显示文字
});

app.use('/public', express.static('public'));


app.listen(8080, function () {
  console.log("服务器已经启动");
});
