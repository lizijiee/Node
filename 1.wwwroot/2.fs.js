var fs = require('fs');
fs.writeFile('./test.txt', 'Hello World', function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('文件创建成功');
})

// 会覆盖原有文件中内容
// fs.writeFile('./test1.txt', 'Hello World', function (err) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log('文件创建成功');
// })
fs.appendFile('./test3.txt', 'Hello WorldappendFileappendFile', function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('文件创建成功');
})

fs.readFile('./test1.txt', 'utf-8',function (err,data) {
    if (err) {
        console.log(err)
        return
    }
    console.log(data);
})