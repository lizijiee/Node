
/*
 * 1、引入Koa模块
 * 2、koa-router路由模块
 * 3、koa-bodyparser 
 * 4、koa-session
 * 5、koa-art-template
 * 6、path
 * 7、 
 * 
 * **/

var Koa = require('koa');

var Router = require('koa-router');

var bodyParser = require('koa-bodyparser');

var session = require('koa-session');

var render = require('koa-art-template');

var path = require('path');

var app = new Koa();

var router = new Router();

//配置模版引擎
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


//配置session 
app.keys = ['some secret hurr'];
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
    { username: '小刚', content: '哈哈' },
]


router.get('/',async function (ctx) {
    ctx.render('login.html')

})

router.post('/login', async function (ctx) {
    var userName = ctx.request.body.username;
    //var passWord = ctx.request.body.possword;

    ctx.session.user = {
        userName: userName
    }

    ctx.redirect('/list')

})

router.get('/list',async function (ctx) {
    ctx.render('list.html',{
        userName: ctx.session.user.userName,
        msgs: msgs
    })
})


router.post('/dosend', async function (ctx) {
    var um = ctx.session.user.userName;
    var con = ctx.request.body.msg

    var newmsgs = { username: um, content: con };

    msgs.push(newmsgs);

    ctx.body = msgs;


})




app.use(session({ store: store }, app));

app.use(bodyParser());

app.use(router.routes());

app.listen('8081', function () {

    console.log('服务器启动成功请访问 localhost:8081')
})










