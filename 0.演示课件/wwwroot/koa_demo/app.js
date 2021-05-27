var Koa = require('koa');

var app = new Koa();

//app.use(function (context) {
//    context.body='Hello World'
//})

//app.use(function (ctx,next) { //中间件
//    console.log(ctx.request.url);
//    console.log(ctx.request.method);
//    console.log(ctx.request.headers);
//    next();
//})
//app.use(function (ctx) {
//    console.log(ctx.response.set('mytest', '11111'));
//    ctx.response.body = 'Hello World';
//})


app.use(function (ctx, next) { //中间件
    console.log(ctx.url);
    console.log(ctx.method);
    console.log(ctx.headers);
    next();
})

app.use(function (ctx) {
    console.log(ctx.set('mytest', '11111'));
    ctx.body = 'Hello World';
})

app.listen(8080, function () {
    console.log('localhost:8080')
})