/* 
    1. 需要引入koa框架
    2. 需要koa-router路由模块
    3. koa-bodyparser
    4. 用户名登陆后需要保存，用到koa-session
    5. koa-art-template
    6. 配置模板引擎需要path模块
*/
var Koa =require('koa');
var Router= require('koa-router');
var bodyParser=require('koa-bodyparser');
var session = require('koa-session');
var render = require('koa-art-template');
var path =require('path');


var app =new Koa();

var router= new Router();

app.keys = ['some secret hurr'];

// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

// 配置session
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
router.get('/',async function(ctx){
    ctx.render('login.html')
})

router.post('/login',async function(ctx){
    var userName = ctx.request.body.username;
    // var passport = ctx.request.body.passport;
    ctx.session.user={
        userName,
        // passport
    }
    ctx.redirect('/list') // 跳转到聊天列表
})
router.get('/list',async function(ctx){
    ctx.render('list.html',{
        userName:ctx.session.user.userName
    })
})

app.use(bodyParser());
app.use(session({ store }, app));
app.use(router.routes());// router放在最后
// session放置在服务端
app.listen(8081,function(){
    console.log('服务器启动成功请访问 localhost:8081')
});
