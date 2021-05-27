/* 
    1.koa
    2.koa-router
    3.koa-bodyparser
    4.koa-sesssion
    5.koa-art-template
    6.path
*/
var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var render = require('koa-art-template');
var path = require('path');
var static = require('koa-static')


var app = new Koa();

var router = new Router();
var IO = require('koa-socket');
var io = new IO();

/* 
    "koa-socket": "^4.4.0", // 服务端
    "socket.io-client": "^4.1.2" // 客户端
*/

/* 
    router 配置
    bodyParser 配置
    session 配置
    render 配置
*/

// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'view'), // 文件目录
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


router.get('/', async function (ctx) {
    ctx.render('login');
})
router.post('/dologin', async function (ctx) {
    // ctx.render('index')
    // 获取用户名密码;
    let { username, possword } = ctx.request.body;
    ctx.session.user = {
        username,
        possword
    }
    ctx.redirect('/index');
})

router.get('/index', async function (ctx) {
    ctx.render('index', {
        username: ctx.session.user.username
    })
})




app.use(session({ store: store }, app));

app.use(bodyParser());
app.use(static(path.resolve('./public'))); // 配置静态资源


app.use(router.routes()); // 路由放到最下面

io.attach(app)
io.on('connection', (ctx, data) => {
    console.log('服务器io已经连接', data);
    // 注意 broadcast 第一个参数名和前端 socket.on 参数保持一直
    io.broadcast('firstIo', '服务器信息Hello') //将sever 信息返回到 client

})


app.listen(8080, function () {
    console.log('服务器已经成功启动，请访问localhost:8080')
})