
var Koa = require('koa');

var Router = require('koa-router');

var bodyParser = require('koa-bodyparser');

var session = require('koa-session');

var render = require('koa-art-template');

var path = require('path');

var static = require('koa-static');

var app = new Koa();

var router = new Router();

var mySession = {};

//var mySession = {

//    时间戳id(key): {
//        username: 用户名,
//        socketid:ctx.socket.socket.id  当前用户的id

//    }
//}


var IO = require('koa-socket')

var io = new IO()

io.attach(app) //让socket.io和app实例关联起来

io.on('connection', function (ctx) {
    console.log('服务器端的sockio已经链接')

    io.broadcast('test', '服务器信息Hello World')
})

io.on('sendMsg', function (ctx) {
    //console.log(ctx.data.allmsg)

    var sockid = ctx.socket.socket.id;

    var obj = f1(sockid);

    io.broadcast('newmsg', obj.username + ':' + ctx.data.allmsg);

})

io.on('login', function (ctx) {
    //console.log(ctx)
    //获取客户端传递过来的id
    var id = ctx.data.id;

    var socketid = ctx.socket.socket.id;

    mySession[id].socketid = socketid;

    ////新增用户

    //console.log('新增一个用户');

    ////删除用户

    //ctx.socket.on('disconnect', function (ctx) {
    //    console.log(ctx);
    //    console.log('删除一个用户')

    //})

    io.broadcast('online', {
        online: mySession
    })

    ctx.socket.on('disconnect', function (ctx) {

        //获取到当前下线人的 id  (socket.socket.id)

        var socketid = ctx.socket.socket.id;

        var key = f2(socketid);

        delete mySession[key];

        io.broadcast('online', {
            online: mySession
        })
    })
})

io.on('msgLs', function (ctx) {
    //获取发送的数据
    var msg = ctx.data.siliaoMsg;

    //获取对谁说的socketid

    var toid = ctx.data.tosocketid;

    //获取 来自谁 说的socketid

    var fromsocketid = ctx.socket.socket.id;

    //根据tosocketid 查找 名字

    var obj = f1(fromsocketid);

    var name = obj.username;

    app._io.to(toid).emit('newmsg',`${name}:${msg}`);

})

io.on('joinGroup', function (ctx) {
    var groupId = ctx.data;
    ctx.socket.socket.join(groupId)
})

io.on('sendGroup', function (ctx) {

    //获取用户发送的内容

    var newmsg = ctx.data.groupMsg;

    var groupid = ctx.data.groupid;

    //获取当前消息是谁发送的

    var fromid = ctx.socket.socket.id;

    var obj = f1(fromid);

    var name = obj.username;

    app._io.to(groupid).emit('newmsg', `来自：${group[groupid]} ${name}:${newmsg}`)
})


var group={
    'a_group': 'A群',
    'b_group': 'B群'
}


function f1(socketid) {
    for (var key in mySession) {
        var obj = mySession[key]
        if (socketid == obj.socketid) {
            return obj
        }
    }
}

function f2(socketid) {
    for (var key in mySession) {
        var obj = mySession[key]
        if (socketid == obj.socketid) {
            return key
        }
    }
}

router.get('/', async function (ctx) {
    ctx.render('login')    
})

router.post('/dologin', async function (ctx) {

   //获取用户所传的用户名和密码
    var username = ctx.request.body.username;
    var password = ctx.request.body.password;

    ctx.session.user = {
        username: username,
    }

    var id = Date.now();

    //将时间戳id保存到session
    ctx.session.user.id = id;

    mySession[id] = {
        username: username,
    }

    ctx.redirect('/index')

})

router.get('/index', async function (ctx) {
    ctx.render('index', {
        username: ctx.session.user.username,
        id: ctx.session.user.id
    })
})

//配置模版引擎
render(app, {
    root: path.join(__dirname, 'views'),
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

app.use(session({ store: store }, app));

app.use(bodyParser());

app.use(static(path.resolve('./public')));

app.use(router.routes());

app.listen(8080, function () {

    console.log('服务器成功启动，请访问localhost:8080')

})


