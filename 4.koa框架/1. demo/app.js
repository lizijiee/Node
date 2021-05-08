var Koa = require('koa');

var app = new Koa();

app.use(function (ctx, next) { //中间件 context
    console.log(ctx.url);
    console.log(ctx.method);
    console.log(ctx.headers);
    next();// 放行开关 app.use
    // context.body = 'Hello World';
});
app.use(function (ctx) {
    console.log(ctx.set('mytest', '1111'));
    ctx.response.body = 'Hello World'
})

app.listen(8080, function () {
    console.log('localhost:8080')
})