var Koa = require('koa');

var fs = require('fs');

var path = require('path');

var static = require('koa-static');
const session = require('koa-session');

var bodyParser = require('koa-bodyparser');

var Router = require('koa-router');

var render = require('koa-art-template');

var router = new Router();

var app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa.sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};


// 模板语法
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async function (ctx) {
    ctx.render('index.html')
})

router.post('/login', async function (ctx) {
    var name = ctx.request.body.username;
    var password = ctx.request.body.password;

    if (name == '小明' && password == '123') {
        ctx.body = '登录成功';
        ctx.session.user = {
            name: name
        }
    } else {
        ctx.body = '用户名或密码错误'
    }
})

router.get('/list', async function (ctx) {
    ctx.body = '欢迎光临' + ctx.session.user.name
})

app.use(static(path.resolve('./public')));

app.use(bodyParser()); // 必须在路由上面

app.use(session(CONFIG, app));
app.use(router.routes()); //放到最下面

app.listen(8080, function () {
    console.log('localhost:8080')
})