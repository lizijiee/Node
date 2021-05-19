
//引入koa模块
var Koa = require('koa');

//bodyparser

var bodyParser = require('koa-bodyparser');


//引入模版引擎

var render = require('koa-art-template');

//引入path模块

var path = require('path')

//引入静态资源

var static = require('koa-static');

//引入路由模块

var stusrouter = require('./routers/stu_router');

var app = new Koa();



//配置模版引擎
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//将第三方模块和app关联起来

app.use(bodyParser());

app.use(static(path.resolve('./public')));

app.use(stusrouter.routes()); 

app.listen(8080, function () {
    console.log('服务器启动成功请访问：loaclhost:8080')

})

