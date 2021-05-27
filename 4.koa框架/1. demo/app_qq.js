/*
    分析需要模块：
    1. koa模块
    2. koa-router
    3. koa-bodyparser
    4. koa-session
    5. koa-art-template
    6. path配置模板引擎
*/

var Koa = require('koa');
var Router = require('koa-router');
var bodyparser = require('koa-bodyparser'); // 前三个需要挂载到实例中。
var session = require('koa-session');
var path = require('path');
var render = require('koa-art-template');

var app = new Koa();
var router = new Router;

// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})


app.keys = ['some secret hurr'];
// 固定代码用来配置服务端session
var store = {
    storeage: {},
    get(key) {
        return this.storeage[key]
    },
    set(key, session) {
        this.storeage[key] = session
    },
    destroy(key) {
        delete this.storeage[key]
    }
}
var msgs = [
    { username: '小明', content: '大家好' },
    { username: '小红', content: 'hello' },
    { username: '小刚', content: '哈哈哈' }
]


router.get('/', async function (ctx) {
    ctx.render('login')
})

router.post('/login', async function (ctx) {
    ctx.session.username = ctx.request.body.username
    ctx.redirect('/list')
})
router.get('/list', async function (ctx) {
    ctx.render('list', {
        username: ctx.session.username,
        msgs: msgs
    })
})

router.post('/dosend', async function (ctx) {
    console.log(ctx.request.body)
    var user = ctx.session.username;
    var content = ctx.request.body.msg;
    var newmsg = { username: user, content: content };
    console.log('user:', user, 'newmsg:', newmsg);
    msgs.push(newmsg);
    ctx.body = msgs;
})


app.use(bodyparser());
app.use(session({ store }, app));



app.use(router.routes());// router放到最后面

app.listen('8081', function () {
    console.log('服务器启动成功，请访问8081端口')
})
