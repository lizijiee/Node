
var express = require('express');

var url = require('url');

var app = express();

app.engine('html', require('express-art-template'));

var students = [
    { name: '小明', sex: '男', time: 2019 },
    { name: '小明1', sex: '女', time: 2018 },
    { name: '小明2', sex: '男', time: 2019 },
]

app.get('/', function (req,res) {
    res.render('index.html', { stu: students})

})

app.use('/add', function (req, res) {
    res.render('add.html')

})

app.use('/doadd', function (req, res) {
    var params = url.parse(req.url, true).query;
    var stus = { name: params.name, sex: params.sex, time: 2019 };
    students.push(stus);
    res.redirect('/');

})

app.listen(8080, function () {
    console.log('请访问 localhost:8080')
})

