
var Koa = require('koa');

var fs = require('fs');

var app = new Koa();

function f1() {

    return new Promise(function (resolve, reject) {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

//koa框架中只要有异步操作 就要使用  async  await   promise

app.use(async function (ctx) {
    if (ctx.url == '/') {

        var data = await f1();

        ctx.body = data.toString();
    }
})

app.listen(8080, function () {
    console.log('localhost:8080')
})