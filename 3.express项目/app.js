var express = require('express');
var urls = require('url');
var app = express();
app.engine('html', require('express-art-template'));
var student = [
    { name: '小明1', sex: '男', time: 2019 },
    { name: '小明2', sex: '男', time: 2018 },
    { name: '小明3', sex: '男', time: 2016 },
    { name: '小红4', sex: '男', time: 2012 },
]
app.get('/', function (req, res) {
    res.render('index.html', { stu: student }) //需要传入对象
})
app.use('/add', function (req, res) {
    res.render('add.html', { stu: student }) //需要传入对象
})
app.use('/doadd', function (req, res) {
    var params = urls.parse(req.url, true).query;
    
    console.log(params);
    
    var stus = { name: params.name, sex: params.sex, time: params.time };
    student.push(stus);
    res.redirect('/')
    // res.render('add.html', { stu: student }) //需要传入对象
})
app.listen(8080, function () {
    console.log('请访问localhost:8080端口')
})