
var Koa = require('koa');

var fs = require('fs');

var path = require('path');

var Router = require('koa-router');

var render = require('koa-art-template');

var router = new Router();

var app = new Koa();

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


router.get('/', async function (ctx) {
    ctx.render('index.html')
})


//router.get()

//router.post()


app.use(router.routes());


app.listen(8080, function () {
    console.log('localhost:8080')
})