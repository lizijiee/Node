var http = require("http");
var fs = require("fs");
var server = http.createServer();

server.on("request", function (req, res) {
  // res.end('Hello');
  var urls = req.url; //获取用户传入url
  if (urls == "/") {
    fs.readFile("9.index.html", function (err, data) {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      res.end(data);
    });
  } else {
    /* 
  else if (urls == "/images/a1.png") {
    fs.readFile("./images/a1.png", function (err, data) {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      res.end(data);
    });
  } else if (urls == "/9.js/test.js") {
    fs.readFile("./9.js/test.js", function (err, data) {
      console.log(2222222222);
      if (err) {
        console.log(err);
      }
      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      res.end(data);
    });
  }  */
  // 优化后
    fs.readFile("." + req.url, function (err, data) {
      if (err) {
        console.log(err);
      }
      //   res.writeHead(200, { "content-type": "text/html;charest=utf-8" }); // 为了显示css去掉这里utf-8
      res.end(data);
    });
  }
});
server.listen(8080, function () {
  console.log("服务器已经成功启动");
});
