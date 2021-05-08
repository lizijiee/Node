var Koa = require('koa');

var fs = require('fs');

var path = require('path');

var static = require('koa-static');

var bodyParser = require('koa-bodyparser');

var Router = require('koa-router');

var render = require('koa-art-template');

var router = new Router();

var app = new Koa();

// 模板语法
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async function (ctx) {
    ctx.render('index.html')
})
router.post('/test', async function (ctx) {
    ctx.body = ctx.request.body
})

app.use(static(path.resolve('./public')));

app.use(bodyParser()); // 必须在路由上面

app.use(router.routes());

app.listen(8080, function () {
    console.log('localhost:8080')
})