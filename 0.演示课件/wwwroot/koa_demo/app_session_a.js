
var Koa = require('koa');

var fs = require('fs');

var session = require('koa-session');

var static = require('koa-static');

var bodyParser = require('koa-bodyparser');

var path = require('path');

var Router = require('koa-router');

var render = require('koa-art-template');

var router = new Router();

var app = new Koa();

app.keys = ['some secret hurr'];

//var CONFIG = {
//    key: 'koa:sess',
//    maxAge: 86400000,
//    autoCommit: true,
//    overwrite: true,
//    httpOnly: true,
//    signed: true,
//    rolling: false,
//    renew: false,
//};


//
var store = {
    storeage: {},

    get(key) {
        return this.storeage[key]
    },
    set(key, session) {
        this.storeage[key]=session
    },
    destroy(key) {
        delete this.storeage[key]
    }
}



render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


router.get('/', async function (ctx) {
    ctx.render('index.html')
})

router.post('/login', async function (ctx) {

    var uName = ctx.request.body.username;
    var pWord = ctx.request.body.possword;

    if (uName == '小红' && pWord == '123') {
        ctx.body = '登陆成功'
        ctx.session.user = {
            uName: uName
        }

    } else {

        ctx.body = '用户名或密码错误'
    }
})


router.get('/list', async function (ctx) {

    ctx.body = '欢迎光临：' + ctx.session.user.uName;

})



//router.get()

//router.post()

app.use(static(path.resolve('./public')));
app.use(session({store:store}, app));
app.use(bodyParser());
app.use(router.routes());


app.listen(8080, function () {
    console.log('localhost:8080')
})