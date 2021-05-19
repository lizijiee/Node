
var fs = require('fs');

fs.writeFile('./test.txt', 'Hello World', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('文件创建成功');
})

fs.writeFile('./test1.txt', 'Hello World', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('内容已经修改');
})

//追加
fs.appendFile('./test1.txt', '我是appendFile', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('内容已经修改');
})


fs.readFile('./test1.txt', 'utf8',function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    //console.log(data.toString())
    console.log(data)

})